import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { randomUUID } from 'crypto';
import { PricingService } from '../../common/services/pricing.service';
import { OrderCreatedEvent } from '../../core/events/order-created.event';
import { OrderCancelledEvent } from '../../core/events/order-cancelled.event';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

// HOW CROSS-DOMAIN WORKS HERE:
// OrderService needs to trigger stock deduction AND send a notification.
// The WRONG way: import InventoryService + NotificationService → circular deps risk.
// The RIGHT way: emit an event. Both modules react independently. OrderService
// doesn't know or care who is listening. Adding a new side-effect (e.g. analytics)
// just means adding a new listener — zero changes to OrderService.
@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private readonly orders = new Map<string, Order>();

  // EventEmitter2 and PricingService — that's ALL OrderService needs
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly pricingService: PricingService,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    // Hardcoded base prices per product (in production: fetched from InventoryService
    // via a SharedModule service or a read-model/query, NOT by importing InventoryModule)
    const basePrices: Record<string, number> = {
      'prod-001': 150,
      'prod-002': 80,
      'prod-003': 120,
    };

    const basePrice = basePrices[dto.productId];
    if (!basePrice)
      throw new NotFoundException(`Product ${dto.productId} not found`);

    const totalPrice = this.pricingService.calculateTotal(
      basePrice,
      dto.quantity,
    );

    const order: Order = {
      id: randomUUID(),
      productId: dto.productId,
      quantity: dto.quantity,
      customerEmail: dto.customerEmail,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date(),
    };

    this.orders.set(order.id, order);
    this.logger.log(`✅ Order created: #${order.id}`);

    // Fire-and-forget: InventoryModule and NotificationModule both react to this.
    // No imports of those modules needed here — zero circular dep risk.
    this.eventEmitter.emit(
      'order.created',
      new OrderCreatedEvent(
        order.id,
        order.productId,
        order.quantity,
        order.customerEmail,
        order.totalPrice,
      ),
    );

    return order;
  }

  async cancelOrder(orderId: string): Promise<Order> {
    const order = this.orders.get(orderId);
    if (!order) throw new NotFoundException(`Order #${orderId} not found`);

    order.status = 'cancelled';

    this.eventEmitter.emit(
      'order.cancelled',
      new OrderCancelledEvent(order.id, order.productId, order.quantity),
    );

    return order;
  }

  findById(orderId: string): Order {
    const order = this.orders.get(orderId);
    if (!order) throw new NotFoundException(`Order #${orderId} not found`);
    return order;
  }

  findAll(): Order[] {
    return Array.from(this.orders.values());
  }
}

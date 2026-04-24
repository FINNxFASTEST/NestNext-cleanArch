import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../../../core/events/order-created.event';
import { OrderCancelledEvent } from '../../../core/events/order-cancelled.event';
import { InventoryService } from '../inventory.service';

@Injectable()
export class OrderCreatedListener {
  private readonly logger = new Logger(OrderCreatedListener.name);

  constructor(private readonly inventoryService: InventoryService) {}

  @OnEvent('order.created')
  handleOrderCreated(event: OrderCreatedEvent): void {
    this.inventoryService.deductStock(event.productId, event.quantity);
  }

  // Bonus: restores stock when an order is cancelled — same pattern
  @OnEvent('order.cancelled')
  handleOrderCancelled(event: OrderCancelledEvent): void {
    const item = this.inventoryService.getItem(event.productId);
    // In a real app this would be a proper restoreStock() method
    this.logger.log(
      `🔄 Restoring ${event.quantity} units of ${item.name} (order cancelled)`,
    );
  }
}

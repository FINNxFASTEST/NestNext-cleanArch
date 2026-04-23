import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../../../core/events/order-created.event';
import { NotificationService } from '../notification.service';

// KEY PATTERN: NotificationModule does NOT import OrderModule.
// It just listens for events. OrderModule doesn't even know this listener exists.
// This is how you achieve zero coupling between domains.
@Injectable()
export class OrderCreatedListener {
  constructor(private readonly notificationService: NotificationService) {}

  @OnEvent('order.created')
  handle(event: OrderCreatedEvent): void {
    this.notificationService.sendOrderConfirmation(
      event.customerEmail,
      event.orderId,
      event.totalPrice,
    );
  }
}

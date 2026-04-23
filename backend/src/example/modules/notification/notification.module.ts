import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { OrderCreatedListener } from './listeners/order-created.listener';

@Module({
  providers: [NotificationService, OrderCreatedListener],
  exports: [NotificationService],
})
export class NotificationModule {}

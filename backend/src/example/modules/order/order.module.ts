import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

// OrderModule imports NOTHING from InventoryModule or NotificationModule.
// Cross-domain communication goes entirely through EventEmitter2 (registered globally).
// PricingService is available via @Global() SharedModule.
//
// IF you ever find yourself needing forwardRef() here, stop and ask:
// "Can this be an event instead?" — 9/10 times the answer is yes.
@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

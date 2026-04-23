import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SharedModule } from './common/shared.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { NotificationModule } from './modules/notification/notification.module';
import { OrderModule } from './modules/order/order.module';

// Self-contained example module demonstrating cross-domain patterns:
// 1. @Global SharedModule — shared services without cross-imports
// 2. EventEmitter2 — domain side effects without circular dependencies
@Module({
  imports: [
    EventEmitterModule.forRoot({ wildcard: true }),
    SharedModule,
    OrderModule,
    InventoryModule,
    NotificationModule,
  ],
})
export class ExampleModule {}

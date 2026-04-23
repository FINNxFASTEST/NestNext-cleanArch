import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { OrderCreatedListener } from './listeners/order-created.listener';

// Notice: NO import of OrderModule here. Zero coupling.
// PricingService is available because SharedModule is @Global.
@Module({
  providers: [InventoryService, OrderCreatedListener],
  exports: [InventoryService],
})
export class InventoryModule {}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PricingService } from '../../common/services/pricing.service';
import { InventoryItem } from './entities/inventory-item.entity';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);

  // PricingService is injected from SharedModule (@Global) — no import needed in inventory.module.ts
  constructor(private readonly pricingService: PricingService) {}

  // Seed data — simulates a database
  private readonly items = new Map<string, InventoryItem>([
    ['prod-001', { productId: 'prod-001', name: 'Camping Tent', basePrice: 150, stock: 20 }],
    ['prod-002', { productId: 'prod-002', name: 'Sleeping Bag', basePrice: 80, stock: 50 }],
    ['prod-003', { productId: 'prod-003', name: 'Hiking Boots', basePrice: 120, stock: 5 }],
  ]);

  getItem(productId: string): InventoryItem {
    const item = this.items.get(productId);
    if (!item) throw new NotFoundException(`Product ${productId} not found`);
    return item;
  }

  deductStock(productId: string, quantity: number): void {
    const item = this.getItem(productId);
    if (item.stock < quantity) {
      throw new Error(`Insufficient stock for ${productId}`);
    }
    item.stock -= quantity;
    this.logger.log(`📦 Stock updated — ${item.name}: ${item.stock + quantity} → ${item.stock}`);

    if (item.stock <= 3) {
      this.logger.warn(`⚠️  ${item.name} is low on stock: ${item.stock} remaining`);
    }
  }

  getPriceForOrder(productId: string, quantity: number): number {
    const item = this.getItem(productId);
    return this.pricingService.calculateTotal(item.basePrice, quantity);
  }
}

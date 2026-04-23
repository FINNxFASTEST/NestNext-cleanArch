import { Injectable } from '@nestjs/common';

// Shared cross-domain service — lives in SharedModule so ANY module can use it
// without importing each other. This is how you share logic without coupling domains.
@Injectable()
export class PricingService {
  calculateTotal(basePrice: number, quantity: number): number {
    const subtotal = basePrice * quantity;
    const discount = quantity >= 5 ? 0.1 : 0;
    return parseFloat((subtotal * (1 - discount)).toFixed(2));
  }
}

export type OrderStatus = 'pending' | 'confirmed' | 'cancelled';

export class Order {
  id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  customerEmail: string;
  status: OrderStatus;
  createdAt: Date;
}

export class OrderCancelledEvent {
  constructor(
    public readonly orderId: string,
    public readonly productId: string,
    public readonly quantity: number,
  ) {}
}

export class OrderCreatedEvent {
  constructor(
    public readonly orderId: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly customerEmail: string,
    public readonly totalPrice: number,
  ) {}
}

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  sendOrderConfirmation(
    email: string,
    orderId: string,
    totalPrice: number,
  ): void {
    // In production: integrate with SendGrid / SES here
    this.logger.log(
      `📧 Email sent to ${email} — Order #${orderId} confirmed. Total: $${totalPrice}`,
    );
  }

  sendStockAlert(productId: string, remainingStock: number): void {
    this.logger.warn(
      `⚠️  Low stock alert — Product ${productId} has only ${remainingStock} units left`,
    );
  }
}

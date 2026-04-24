import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export class BookingAddOn {
  @ApiProperty() name: string;
  @ApiProperty() price: number;
}

export class Booking {
  @ApiProperty({ type: String }) id: string;

  @ApiProperty({ type: String })
  campsiteId: string;

  @ApiProperty({ type: String })
  pitchId: string;

  @ApiProperty({ type: String })
  organizationId: string;

  @ApiPropertyOptional({ type: String })
  userId?: string | null;

  @ApiProperty({ type: String }) guestName: string;
  @ApiProperty({ type: String }) guestEmail: string;

  @ApiPropertyOptional({ type: String })
  guestPhone?: string | null;

  @ApiProperty({ type: Date }) checkIn: Date;
  @ApiProperty({ type: Date }) checkOut: Date;
  @ApiProperty({ type: Number }) guests: number;

  @ApiProperty({ type: () => [BookingAddOn] })
  addOns: BookingAddOn[];

  @ApiProperty({ type: Number })
  totalPrice: number;

  @ApiProperty({ enum: ['pending', 'confirmed', 'cancelled'] })
  status: BookingStatus;

  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

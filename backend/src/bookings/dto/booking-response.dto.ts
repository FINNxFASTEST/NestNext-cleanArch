import { ApiProperty } from '@nestjs/swagger';
import type { IAddOn } from '../interfaces/add-on.interface';
import type {
  BookingStatus,
  IBookingResponse,
} from '../interfaces/booking.interface';

export class AddOnResponseDto implements IAddOn {
  @ApiProperty({ example: 'Breakfast for 2' })
  name: string;

  @ApiProperty({ example: 350 })
  price: number;
}

export class BookingResponseDto implements IBookingResponse {
  @ApiProperty({ example: '65f1a0c8e4b0a1234567890d' })
  _id: string;

  @ApiProperty({
    example: '65f1a0c8e4b0a1234567890c',
    nullable: true,
    description: 'Null for anonymous bookings',
  })
  userId: string | null;

  @ApiProperty({ example: '65f1a0c8e4b0a1234567890a' })
  campsiteId: string;

  @ApiProperty({ example: 'Riverside Tent A' })
  pitchId: string;

  @ApiProperty({ example: 'Jane Doe' })
  guestName: string;

  @ApiProperty({ example: 'jane@example.com' })
  guestEmail: string;

  @ApiProperty({ example: '+66812345678' })
  guestPhone: string;

  @ApiProperty({ example: '2026-06-01T00:00:00.000Z' })
  checkIn: Date;

  @ApiProperty({ example: '2026-06-05T00:00:00.000Z' })
  checkOut: Date;

  @ApiProperty({ example: 2 })
  guests: number;

  @ApiProperty({ type: [AddOnResponseDto] })
  addOns: AddOnResponseDto[];

  @ApiProperty({ example: 4800 })
  totalPrice: number;

  @ApiProperty({
    enum: ['pending', 'confirmed', 'cancelled'],
    example: 'confirmed',
  })
  status: BookingStatus;

  @ApiProperty({ example: '2026-04-23T10:15:30.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-04-23T10:15:30.000Z' })
  updatedAt: Date;
}

export class UnavailableDatesResponseDto {
  @ApiProperty({
    type: [Date],
    example: ['2026-06-01T00:00:00.000Z', '2026-06-02T00:00:00.000Z'],
    description: 'Dates when the pitch is already booked',
  })
  dates: Date[];
}

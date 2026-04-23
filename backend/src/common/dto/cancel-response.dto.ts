import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto {
  @ApiProperty({ example: true })
  success: true;
}

export class CancelBookingResponseDto extends SuccessResponseDto {
  @ApiProperty({ example: '65f1a0c8e4b0a1234567890d' })
  bookingId: string;
}

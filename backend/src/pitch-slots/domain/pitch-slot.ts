import { ApiProperty } from '@nestjs/swagger';

export class PitchSlot {
  @ApiProperty({ type: String }) id: string;

  @ApiProperty({ type: String })
  pitchId: string;

  @ApiProperty({ type: String })
  campsiteId: string;

  @ApiProperty({ type: String })
  bookingId: string;

  @ApiProperty({ type: Date })
  date: Date;

  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

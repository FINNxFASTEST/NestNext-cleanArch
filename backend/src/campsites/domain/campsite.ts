import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type PitchType = 'tent' | 'glamping' | 'rv' | 'cabin';
export type CampsiteStatus = 'active' | 'inactive';

export class CampsiteLocation {
  @ApiProperty({ type: String }) province: string;
  @ApiProperty({ type: String }) district: string;
  @ApiProperty({ type: Number }) lat: number;
  @ApiProperty({ type: Number }) lng: number;
}

export class Pitch {
  @ApiProperty({ type: String }) id: string;
  @ApiProperty({ enum: ['tent', 'glamping', 'rv', 'cabin'] }) type: PitchType;
  @ApiProperty({ type: String }) name: string;
  @ApiProperty({ type: Number }) maxGuests: number;
  @ApiProperty({ type: Number }) pricePerNight: number;
  @ApiPropertyOptional({ type: String }) size?: string;
}

export class Campsite {
  @ApiProperty({ type: String }) id: string;

  @ApiProperty({ type: String })
  organizationId: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  description?: string | null;

  @ApiProperty({ type: () => CampsiteLocation })
  location: CampsiteLocation;

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty({ type: [String] })
  amenities: string[];

  @ApiProperty({ type: () => [Pitch] })
  pitches: Pitch[];

  @ApiProperty({ enum: ['active', 'inactive'] })
  status: CampsiteStatus;

  @ApiProperty() createdAt: Date;
  @ApiProperty() updatedAt: Date;
}

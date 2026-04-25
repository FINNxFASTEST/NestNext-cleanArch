import { ApiProperty } from '@nestjs/swagger';

export class Amenity {
  @ApiProperty({ type: String }) id: string;
  @ApiProperty({ type: String }) label: string;
  @ApiProperty({ type: String }) iconKey: string;
  @ApiProperty() createdAt: Date;
}

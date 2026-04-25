import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateAmenityDto {
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(1)
  thName!: string;

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(1)
  enName!: string;

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(1)
  iconKey!: string;
}

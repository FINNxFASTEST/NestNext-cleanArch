import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateAmenityDto {
  @ApiProperty({ type: String })
  @IsString()
  @MinLength(1)
  label!: string;

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(1)
  englishName!: string;

  @ApiProperty({ type: String })
  @IsString()
  @MinLength(1)
  iconKey!: string;
}

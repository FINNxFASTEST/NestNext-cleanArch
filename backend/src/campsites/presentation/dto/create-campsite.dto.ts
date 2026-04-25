import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsLatitude,
  IsLongitude,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateCampsiteAmenityDto {
  @ApiProperty()
  @IsString()
  thName!: string;

  @ApiProperty()
  @IsString()
  enName!: string;

  @ApiProperty()
  @IsString()
  iconKey!: string;
}

export class CreateCampsiteLocationDto {
  @ApiProperty()
  @IsString()
  province!: string;

  @ApiProperty()
  @IsString()
  district!: string;

  @ApiProperty()
  @IsLatitude()
  lat!: number;

  @ApiProperty()
  @IsLongitude()
  lng!: number;
}

export class CreatePitchDto {
  @ApiProperty({ enum: ['tent', 'glamping', 'rv', 'cabin'] })
  @IsIn(['tent', 'glamping', 'rv', 'cabin'])
  type!: 'tent' | 'glamping' | 'rv' | 'cabin';

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ minimum: 1 })
  @IsNumber()
  @Min(1)
  maxGuests!: number;

  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  pricePerNight!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  size?: string;
}

export class CreateCampsiteDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  organizationId!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: () => CreateCampsiteLocationDto })
  @ValidateNested()
  @Type(() => CreateCampsiteLocationDto)
  location!: CreateCampsiteLocationDto;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({ type: () => [CreateCampsiteAmenityDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCampsiteAmenityDto)
  amenities?: CreateCampsiteAmenityDto[];

  @ApiProperty({ type: () => [CreatePitchDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePitchDto)
  pitches!: CreatePitchDto[];
}

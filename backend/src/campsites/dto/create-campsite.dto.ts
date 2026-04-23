import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class PitchDto {
  @ApiProperty() @IsString() name!: string;
  @ApiProperty({ enum: ['tent', 'glamping', 'rv', 'cabin'] })
  @IsEnum(['tent', 'glamping', 'rv', 'cabin'])
  type!: string;
  @ApiProperty() @IsNumber() @Min(1) maxGuests!: number;
  @ApiProperty() @IsNumber() @Min(0) pricePerNight!: number;
}

export class BankAccountDto {
  @ApiProperty() @IsString() bankName!: string;
  @ApiProperty() @IsString() accountNumber!: string;
  @ApiProperty() @IsString() accountName!: string;
}

export class CreateCampsiteDto {
  // Listing info
  @ApiProperty() @IsString() name!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() images?: string[];
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() amenities?: string[];
  @ApiPropertyOptional({ type: [PitchDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => PitchDto)
  pitches?: PitchDto[];

  // Merchant profile fields
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() address?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() taxId?: string;
  @ApiPropertyOptional({ type: BankAccountDto })
  @IsOptional() @ValidateNested() @Type(() => BankAccountDto)
  bankAccount?: BankAccountDto;
}

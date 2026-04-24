import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class AddOnDto {
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiProperty() @IsNumber() @Min(0) price!: number;
}

export class CreateBookingDto {
  @ApiProperty() @IsMongoId() @IsNotEmpty() campsiteId!: string;
  @ApiProperty() @IsString() @IsNotEmpty() pitchId!: string;

  @ApiProperty() @IsString() @IsNotEmpty() guestName!: string;
  @ApiProperty() @IsEmail() @IsNotEmpty() guestEmail!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() guestPhone?: string;

  @ApiProperty({ example: '2025-06-01' }) @IsDateString() @IsNotEmpty() checkIn!: string;
  @ApiProperty({ example: '2025-06-05' }) @IsDateString() @IsNotEmpty() checkOut!: string;
  @ApiProperty() @IsNumber() @Min(1) guests!: number;

  @ApiPropertyOptional({ type: [AddOnDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddOnDto)
  addOns?: AddOnDto[];
}

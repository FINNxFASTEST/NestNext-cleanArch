import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class AddOnDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsNumber() @Min(0) price: number;
}

export class CreateBookingDto {
  @ApiProperty() @IsMongoId() campsiteId: string;
  @ApiProperty() @IsString() pitchId: string;

  @ApiProperty() @IsString() guestName: string;
  @ApiProperty() @IsEmail() guestEmail: string;
  @ApiPropertyOptional() @IsOptional() @IsString() guestPhone?: string;

  @ApiProperty({ example: '2025-06-01' }) @IsDateString() checkIn: string;
  @ApiProperty({ example: '2025-06-05' }) @IsDateString() checkOut: string;
  @ApiProperty() @IsNumber() @Min(1) guests: number;

  @ApiPropertyOptional({ type: [AddOnDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddOnDto)
  addOns?: AddOnDto[];
}

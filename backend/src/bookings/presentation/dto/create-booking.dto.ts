import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { lowerCaseTransformer } from '../../../utils/transformers/lower-case.transformer';

export class BookingAddOnDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateBookingDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  campsiteId: string;

  @ApiProperty({ type: String })
  @IsMongoId()
  pitchId: string;

  @ApiProperty()
  @IsString()
  guestName: string;

  @ApiProperty()
  @IsEmail()
  @Transform(lowerCaseTransformer)
  guestEmail: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  guestPhone?: string;

  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsDate()
  checkIn: Date;

  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsDate()
  checkOut: Date;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @Min(1)
  guests: number;

  @ApiPropertyOptional({ type: () => [BookingAddOnDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingAddOnDto)
  addOns?: BookingAddOnDto[];
}

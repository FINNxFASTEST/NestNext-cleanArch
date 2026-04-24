import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { BankAccount } from '../domain/bank-account';
import type { CampsiteStatus } from '../domain/campsite';
import type { Pitch, PitchType } from '../domain/pitch';

export class PitchResponseDto implements Pitch {
  @ApiPropertyOptional({ example: '65f1a0c8e4b0a1234567890b' })
  _id?: string;

  @ApiProperty({ example: 'Riverside Tent A' })
  name!: string;

  @ApiProperty({ enum: ['tent', 'glamping', 'rv', 'cabin'], example: 'tent' })
  type!: PitchType;

  @ApiProperty({ example: 4 })
  maxGuests!: number;

  @ApiProperty({ example: 1200 })
  pricePerNight!: number;
}

export class BankAccountResponseDto implements BankAccount {
  @ApiProperty({ example: 'Kasikorn Bank' })
  bankName!: string;

  @ApiProperty({ example: '123-4-56789-0' })
  accountNumber!: string;

  @ApiProperty({ example: 'Kangtent Co., Ltd.' })
  accountName!: string;
}

export class CampsiteResponseDto {
  @ApiProperty({ example: '65f1a0c8e4b0a1234567890a' })
  _id!: string;

  @ApiProperty({ example: '65f1a0c8e4b0a1234567890c' })
  ownerId!: string;

  @ApiProperty({ example: 'Pai Forest Camp' })
  name!: string;

  @ApiProperty({ example: 'Riverside campsite nestled in the pine forest.' })
  description!: string;

  @ApiProperty({ example: 'Pai, Mae Hong Son' })
  location!: string;

  @ApiProperty({ type: [String], example: ['https://cdn.x/p1.jpg'] })
  images!: string[];

  @ApiProperty({ type: [String], example: ['wifi', 'shower', 'bbq'] })
  amenities!: string[];

  @ApiProperty({ type: [PitchResponseDto] })
  pitches!: PitchResponseDto[];

  @ApiProperty({ enum: ['active', 'inactive'], example: 'active' })
  status!: CampsiteStatus;

  @ApiProperty({ example: '+66812345678' })
  phone!: string;

  @ApiProperty({ example: '123 Moo 4, Pai' })
  address!: string;

  @ApiProperty({ example: '0105558000000' })
  taxId!: string;

  @ApiProperty({ type: BankAccountResponseDto })
  bankAccount!: BankAccountResponseDto;

  @ApiProperty({ example: false })
  isVerified!: boolean;

  @ApiProperty({ example: '2026-04-23T10:15:30.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-04-23T10:15:30.000Z' })
  updatedAt!: Date;
}

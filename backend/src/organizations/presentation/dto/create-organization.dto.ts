import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class OrganizationBankAccountDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  accountName: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  accountNumber: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  bankName: string;
}

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Chiang Mai Valley Camps' })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name: string;

  @ApiProperty({
    example: 'chiang-mai-valley',
    description: 'URL-safe unique slug, lowercase letters/numbers/dashes',
  })
  @IsString()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/, { message: 'slug must be kebab-case' })
  @MinLength(2)
  @MaxLength(80)
  slug: string;

  @ApiProperty({ example: 'ops@cmvalley.co' })
  @IsEmail()
  contactEmail: string;

  @ApiPropertyOptional({ example: '+66801112222' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  taxId?: string;

  @ApiPropertyOptional({ type: () => OrganizationBankAccountDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => OrganizationBankAccountDto)
  bankAccount?: OrganizationBankAccountDto;
}

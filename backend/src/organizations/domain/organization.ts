import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrganizationBankAccount {
  @ApiProperty({ type: String })
  accountName: string;

  @ApiProperty({ type: String })
  accountNumber: string;

  @ApiProperty({ type: String })
  bankName: string;
}

export type OrganizationStatus = 'pending' | 'approved' | 'suspended';

export class Organization {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  slug: string;

  @ApiProperty({ type: String })
  contactEmail: string;

  @ApiPropertyOptional({ type: String })
  phone?: string | null;

  @ApiPropertyOptional({ type: String })
  taxId?: string | null;

  @ApiPropertyOptional({ type: () => OrganizationBankAccount })
  bankAccount?: OrganizationBankAccount | null;

  @ApiProperty({
    type: String,
    enum: ['pending', 'approved', 'suspended'],
  })
  status: OrganizationStatus;

  @ApiProperty({ type: String, description: 'ID of the founding host user' })
  ownerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

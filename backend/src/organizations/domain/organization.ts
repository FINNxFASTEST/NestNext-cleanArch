export class OrganizationBankAccount {
  accountName!: string;
  accountNumber!: string;
  bankName!: string;
}

export type OrganizationStatus = 'pending' | 'approved' | 'suspended';

export class Organization {
  id!: string;
  name!: string;
  slug!: string;
  contactEmail!: string;
  phone?: string | null;
  taxId?: string | null;
  bankAccount?: OrganizationBankAccount | null;
  status!: OrganizationStatus;
  ownerId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

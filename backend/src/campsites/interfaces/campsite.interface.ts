import type { IBankAccount } from './bank-account.interface';
import type { IPitch } from './pitch.interface';

export type CampsiteStatus = 'active' | 'inactive';

export interface ICampsite {
  _id: string;
  ownerId: string;
  name: string;
  description: string;
  location: string;
  images: string[];
  amenities: string[];
  pitches: IPitch[];
  status: CampsiteStatus;
  phone: string;
  address: string;
  taxId: string;
  bankAccount: IBankAccount;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ICampsiteResponse = ICampsite;

import type { User } from '../../users/domain/user';
import type { BankAccount } from './bank-account';
import type { Pitch } from './pitch';

export type CampsiteStatus = 'active' | 'inactive';

export class Campsite {
  _id!: string;
  ownerId!: string | User;
  name!: string;
  description!: string;
  location!: string;
  images!: string[];
  amenities!: string[];
  pitches!: Pitch[];
  status!: CampsiteStatus;
  phone!: string;
  address!: string;
  taxId!: string;
  bankAccount!: BankAccount;
  isVerified!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

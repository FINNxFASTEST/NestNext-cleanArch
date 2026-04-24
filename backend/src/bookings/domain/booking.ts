import type { Campsite } from '../../campsites/domain/campsite';
import type { User } from '../../users/domain/user';
import type { AddOn } from './add-on';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export class Booking {
  _id!: string;
  userId!: string | User | null;
  campsiteId!: string | Campsite;
  pitchId!: string;
  guestName!: string;
  guestEmail!: string;
  guestPhone!: string;
  checkIn!: Date;
  checkOut!: Date;
  guests!: number;
  addOns!: AddOn[];
  totalPrice!: number;
  status!: BookingStatus;
  createdAt!: Date;
  updatedAt!: Date;
}

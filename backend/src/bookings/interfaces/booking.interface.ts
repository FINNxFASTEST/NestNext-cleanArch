import type { IAddOn } from './add-on.interface';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface IBooking {
  _id: string;
  userId: string | null;
  campsiteId: string;
  pitchId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  addOns: IAddOn[];
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type IBookingResponse = IBooking;

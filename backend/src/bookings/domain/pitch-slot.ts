import type { Booking } from './booking';

export class PitchSlot {
  _id!: string;
  pitchId!: string;
  date!: Date;
  bookingId!: string | Booking;
}

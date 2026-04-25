export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export class BookingAddOn {
  name!: string;
  price!: number;
}

export class Booking {
  id!: string;
  campsiteId!: string;
  pitchId!: string;
  organizationId!: string;
  userId?: string | null;
  guestName!: string;
  guestEmail!: string;
  guestPhone?: string | null;
  checkIn!: Date;
  checkOut!: Date;
  guests!: number;
  addOns!: BookingAddOn[];
  totalPrice!: number;
  status!: BookingStatus;
  createdAt!: Date;
  updatedAt!: Date;
}

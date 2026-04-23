export interface Pitch {
  _id?: string;
  name: string;
  type: 'tent' | 'glamping' | 'rv' | 'cabin';
  maxGuests: number;
  pricePerNight: number;
}

export interface Campsite {
  _id: string;
  name: string;
  description?: string;
  location?: string;
  images?: string[];
  amenities?: string[];
  pitches: Pitch[];
  status: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}

export interface AddOn {
  name: string;
  price: number;
}

export interface Booking {
  _id: string;
  campsiteId: string;
  pitchId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  addOns: AddOn[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
}

export interface User {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'guest' | 'admin';
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
}

export interface CreateBookingDto {
  campsiteId: string;
  pitchId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  addOns?: AddOn[];
}

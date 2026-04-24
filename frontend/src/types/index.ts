export type UserRole = 'admin' | 'host' | 'customer';

export type MemberRole = 'owner' | 'manager' | 'staff';

export interface Membership {
  id: string;
  userId: string;
  organizationId: string;
  memberRole: MemberRole;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  contactEmail: string;
  phone?: string | null;
  taxId?: string | null;
  bankAccount?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  } | null;
  status: 'pending' | 'approved' | 'suspended';
  ownerId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pitch {
  id: string;
  name: string;
  type: 'tent' | 'glamping' | 'rv' | 'cabin';
  maxGuests: number;
  pricePerNight: number;
  size?: string;
}

export interface CampsiteLocation {
  province: string;
  district: string;
  lat: number;
  lng: number;
}

export interface Campsite {
  id: string;
  organizationId: string;
  name: string;
  description?: string | null;
  location: CampsiteLocation;
  images: string[];
  amenities: string[];
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
  id: string;
  campsiteId: string;
  pitchId: string;
  organizationId: string;
  userId?: string | null;
  guestName: string;
  guestEmail: string;
  guestPhone?: string | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  addOns: AddOn[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  memberships?: { organizationId: string; memberRole: MemberRole }[];
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    role?: { id: number } | null;
  };
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

export interface PaginatedResponse<T> {
  data: T[];
  hasNextPage: boolean;
}

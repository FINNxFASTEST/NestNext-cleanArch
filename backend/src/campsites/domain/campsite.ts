export type PitchType = 'tent' | 'glamping' | 'rv' | 'cabin';
export type CampsiteStatus = 'active' | 'inactive';

export class CampsiteAmenity {
  label!: string;
  iconKey!: string;
}

export class CampsiteLocation {
  province!: string;
  district!: string;
  lat!: number;
  lng!: number;
}

export class Pitch {
  id!: string;
  type!: PitchType;
  name!: string;
  maxGuests!: number;
  pricePerNight!: number;
  size?: string;
}

export class Campsite {
  id!: string;
  organizationId!: string;
  name!: string;
  description?: string | null;
  location!: CampsiteLocation;
  images!: string[];
  amenities!: CampsiteAmenity[];
  pitches!: Pitch[];
  status!: CampsiteStatus;
  createdAt!: Date;
  updatedAt!: Date;
}

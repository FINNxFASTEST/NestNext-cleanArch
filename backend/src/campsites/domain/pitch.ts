export type PitchType = 'tent' | 'glamping' | 'rv' | 'cabin';

export class Pitch {
  _id?: string;
  name!: string;
  type!: PitchType;
  maxGuests!: number;
  pricePerNight!: number;
}

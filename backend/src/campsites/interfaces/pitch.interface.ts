export type PitchType = 'tent' | 'glamping' | 'rv' | 'cabin';

export interface IPitch {
  _id?: string;
  name: string;
  type: PitchType;
  maxGuests: number;
  pricePerNight: number;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CampsiteDocument = Campsite & Document;

@Schema()
export class Pitch {
  @Prop({ required: true }) name: string;
  @Prop({ required: true, enum: ['tent', 'glamping', 'rv', 'cabin'] }) type: string;
  @Prop({ required: true }) maxGuests: number;
  @Prop({ required: true }) pricePerNight: number;
}

@Schema({ timestamps: true })
export class Campsite {
  @Prop({ required: true }) name: string;
  @Prop() description: string;
  @Prop() location: string;
  @Prop([String]) images: string[];
  @Prop([String]) amenities: string[];
  @Prop({ type: [Object] }) pitches: Pitch[];
  @Prop({ default: 'active', enum: ['active', 'inactive'] }) status: string;
}

export const CampsiteSchema = SchemaFactory.createForClass(Campsite);

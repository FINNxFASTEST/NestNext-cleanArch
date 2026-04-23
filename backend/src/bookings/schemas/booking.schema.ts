import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  // Who booked — null if guest checked out without an account
  @Prop({ type: Types.ObjectId, ref: 'User', index: true, default: null })
  userId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'Campsite', required: true, index: true })
  campsiteId!: Types.ObjectId;

  @Prop({ required: true }) pitchId!: string;

  // Guest contact info (always stored, even for logged-in users)
  @Prop({ required: true }) guestName!: string;
  @Prop({ required: true }) guestEmail!: string;
  @Prop() guestPhone!: string;

  @Prop({ required: true }) checkIn!: Date;
  @Prop({ required: true }) checkOut!: Date;
  @Prop({ required: true }) guests!: number;

  @Prop({ type: [Object], default: [] }) addOns!: { name: string; price: number }[];
  @Prop({ required: true }) totalPrice!: number;

  @Prop({ default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] })
  status!: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);

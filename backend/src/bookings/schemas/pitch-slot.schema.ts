import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PitchSlotDocument = PitchSlot & Document;

/**
 * One document per (pitchId + date) pair.
 * Unique compound index guarantees atomic double-booking prevention
 * without requiring MongoDB replica sets or transactions.
 */
@Schema()
export class PitchSlot {
  @Prop({ required: true }) pitchId: string;
  @Prop({ required: true }) date: Date;
  @Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
  bookingId: Types.ObjectId;
}

export const PitchSlotSchema = SchemaFactory.createForClass(PitchSlot);

PitchSlotSchema.index({ pitchId: 1, date: 1 }, { unique: true });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import type { CampsiteStatus } from '../domain/campsite';
import type { PitchType } from '../domain/pitch';

export type CampsiteDocument = Campsite & Document;

@Schema({ _id: false })
export class BankAccount {
  @Prop() bankName!: string;
  @Prop() accountNumber!: string;
  @Prop() accountName!: string;
}

@Schema({ _id: false })
export class Pitch {
  @Prop({ required: true }) name!: string;
  @Prop({ required: true, enum: ['tent', 'glamping', 'rv', 'cabin'] })
  type!: PitchType;
  @Prop({ required: true }) maxGuests!: number;
  @Prop({ required: true }) pricePerNight!: number;
}

@Schema({ timestamps: true })
export class Campsite {
  // ── Ownership ──────────────────────────────────────────────
  // The merchant user who owns this campsite (campsite = merchant entity)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  ownerId!: Types.ObjectId;

  // ── Listing info ───────────────────────────────────────────
  @Prop({ required: true }) name!: string;
  @Prop() description!: string;
  @Prop() location!: string;
  @Prop([String]) images!: string[];
  @Prop([String]) amenities!: string[];
  @Prop({ type: [Object] }) pitches!: (Pitch & { _id?: Types.ObjectId })[];
  @Prop({ default: 'active', enum: ['active', 'inactive'] })
  status!: CampsiteStatus;

  // ── Merchant profile (lives on the campsite, not a separate collection) ──
  @Prop() phone!: string;
  @Prop() address!: string;
  @Prop() taxId!: string;
  @Prop({ type: Object }) bankAccount!: BankAccount;
  @Prop({ default: false }) isVerified!: boolean;
}

export const CampsiteSchema = SchemaFactory.createForClass(Campsite);

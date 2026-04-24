import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../utils/document-entity-helper';

export type BookingSchemaDocument = HydratedDocument<BookingSchemaClass>;

@Schema({ _id: false })
export class BookingAddOnSchema {
  @Prop({ type: String, required: true }) name: string;
  @Prop({ type: Number, required: true }) price: number;
}

export const BookingAddOnSchemaFactory = SchemaFactory.createForClass(
  BookingAddOnSchema,
);

@Schema({
  collection: 'bookings',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class BookingSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, required: true, index: true })
  campsiteId: string;

  @Prop({ type: String, required: true, index: true })
  pitchId: string;

  @Prop({ type: String, required: true, index: true })
  organizationId: string;

  @Prop({ type: String, default: null, index: true })
  userId?: string | null;

  @Prop({ type: String, required: true })
  guestName: string;

  @Prop({ type: String, required: true })
  guestEmail: string;

  @Prop({ type: String, default: null })
  guestPhone?: string | null;

  @Prop({ type: Date, required: true })
  checkIn: Date;

  @Prop({ type: Date, required: true })
  checkOut: Date;

  @Prop({ type: Number, required: true, min: 1 })
  guests: number;

  @Prop({ type: [BookingAddOnSchemaFactory], default: [] })
  addOns: BookingAddOnSchema[];

  @Prop({ type: Number, required: true, min: 0 })
  totalPrice: number;

  @Prop({
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
    index: true,
  })
  status: 'pending' | 'confirmed' | 'cancelled';

  @Prop({ default: now }) createdAt: Date;
  @Prop({ default: now }) updatedAt: Date;
}

export const BookingSchema = SchemaFactory.createForClass(BookingSchemaClass);

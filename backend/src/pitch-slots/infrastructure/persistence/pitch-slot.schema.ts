import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../utils/document-entity-helper';

export type PitchSlotSchemaDocument = HydratedDocument<PitchSlotSchemaClass>;

@Schema({
  collection: 'pitch-slots',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class PitchSlotSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, required: true, index: true })
  pitchId: string;

  @Prop({ type: String, required: true, index: true })
  campsiteId: string;

  @Prop({ type: String, required: true, index: true })
  bookingId: string;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const PitchSlotSchema = SchemaFactory.createForClass(PitchSlotSchemaClass);

PitchSlotSchema.index({ pitchId: 1, date: 1 }, { unique: true });

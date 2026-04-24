import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type CampsiteSchemaDocument = HydratedDocument<CampsiteSchemaClass>;

@Schema({ _id: false })
export class CampsiteLocationSchema {
  @Prop({ type: String, required: true }) province: string;
  @Prop({ type: String, required: true }) district: string;
  @Prop({ type: Number, required: true }) lat: number;
  @Prop({ type: Number, required: true }) lng: number;
}

export const CampsiteLocationSchemaFactory = SchemaFactory.createForClass(
  CampsiteLocationSchema,
);

@Schema()
export class PitchSchema {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({
    type: String,
    enum: ['tent', 'glamping', 'rv', 'cabin'],
    required: true,
  })
  type: 'tent' | 'glamping' | 'rv' | 'cabin';

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  maxGuests: number;

  @Prop({ type: Number, required: true })
  pricePerNight: number;

  @Prop({ type: String })
  size?: string;
}

export const PitchSchemaFactory = SchemaFactory.createForClass(PitchSchema);

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class CampsiteSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, required: true, index: true })
  organizationId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, default: null })
  description?: string | null;

  @Prop({ type: CampsiteLocationSchemaFactory, required: true })
  location: CampsiteLocationSchema;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  amenities: string[];

  @Prop({ type: [PitchSchemaFactory], default: [] })
  pitches: PitchSchema[];

  @Prop({
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    index: true,
  })
  status: 'active' | 'inactive';

  @Prop({ default: now }) createdAt: Date;
  @Prop({ default: now }) updatedAt: Date;
}

export const CampsiteSchema = SchemaFactory.createForClass(CampsiteSchemaClass);

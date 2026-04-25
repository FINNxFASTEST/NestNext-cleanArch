import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../utils/document-entity-helper';

export type AmenitySchemaDocument = HydratedDocument<AmenitySchemaClass>;

@Schema({
  collection: 'amenities',
  timestamps: { createdAt: true, updatedAt: false },
  toJSON: { virtuals: true, getters: true },
})
export class AmenitySchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, required: true, index: true })
  thName!: string;

  @Prop({ type: String, required: true, index: true })
  enName!: string;

  @Prop({ type: String, required: true })
  iconKey!: string;

  @Prop({ default: now })
  createdAt!: Date;
}

export const AmenitySchema = SchemaFactory.createForClass(AmenitySchemaClass);
AmenitySchema.index({ thName: 'text', enName: 'text' });

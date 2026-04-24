import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../utils/document-entity-helper';

export type ReviewSchemaDocument = HydratedDocument<ReviewSchemaClass>;

@Schema({
  collection: 'reviews',
  timestamps: true,
  toJSON: { virtuals: true, getters: true },
})
export class ReviewSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, required: true, index: true })
  campsiteId: string;

  @Prop({ type: String, required: true, index: true })
  userId: string;

  @Prop({ type: Number, required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ type: String, default: null })
  comment: string | null;

  @Prop({ default: now }) createdAt: Date;
  @Prop({ default: now }) updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewSchemaClass);

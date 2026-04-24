import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type OrganizationSchemaDocument =
  HydratedDocument<OrganizationSchemaClass>;

@Schema({ _id: false })
export class OrganizationBankAccountSchema {
  @Prop({ type: String, required: true })
  accountName: string;

  @Prop({ type: String, required: true })
  accountNumber: string;

  @Prop({ type: String, required: true })
  bankName: string;
}

export const OrganizationBankAccountSchemaFactory =
  SchemaFactory.createForClass(OrganizationBankAccountSchema);

export type OrganizationStatus = 'pending' | 'approved' | 'suspended';

@Schema({
  collection: 'organizations',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class OrganizationSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  slug: string;

  @Prop({ type: String, required: true })
  contactEmail: string;

  @Prop({ type: String, default: null })
  phone?: string | null;

  @Prop({ type: String, default: null })
  taxId?: string | null;

  @Prop({ type: OrganizationBankAccountSchemaFactory, default: null })
  bankAccount?: OrganizationBankAccountSchema | null;

  @Prop({
    type: String,
    enum: ['pending', 'approved', 'suspended'],
    default: 'pending',
    index: true,
  })
  status: OrganizationStatus;

  @Prop({ type: String, required: true, index: true })
  ownerId: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const OrganizationSchema = SchemaFactory.createForClass(
  OrganizationSchemaClass,
);

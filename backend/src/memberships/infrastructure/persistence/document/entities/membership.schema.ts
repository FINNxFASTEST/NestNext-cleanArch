import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type MembershipSchemaDocument = HydratedDocument<MembershipSchemaClass>;

export type MemberRole = 'owner' | 'manager' | 'staff';

@Schema({
  collection: 'memberships',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class MembershipSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, required: true, index: true })
  userId: string;

  @Prop({ type: String, required: true, index: true })
  organizationId: string;

  @Prop({
    type: String,
    enum: ['owner', 'manager', 'staff'],
    required: true,
  })
  memberRole: MemberRole;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const MembershipSchema = SchemaFactory.createForClass(
  MembershipSchemaClass,
);

MembershipSchema.index({ userId: 1, organizationId: 1 }, { unique: true });

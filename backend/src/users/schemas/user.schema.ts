import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import type { UserRole } from '../domain/user';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: false,
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    transform: (_doc, ret: Record<string, unknown>) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ default: 'guest', enum: ['guest', 'merchant', 'admin'] })
  role!: UserRole;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

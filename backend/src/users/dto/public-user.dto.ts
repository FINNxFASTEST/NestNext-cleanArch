import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import type { IPublicUser, UserRole } from '../interfaces/user.interface';

export class PublicUserDto implements IPublicUser {
  @ApiProperty({ example: '65f1a0c8e4b0a1234567890a' })
  _id: string;

  @ApiProperty({ example: 'jane@example.com' })
  email: string;

  @ApiProperty({ example: 'Jane' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ enum: ['guest', 'merchant', 'admin'], example: 'guest' })
  role: UserRole;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: '2026-04-23T10:15:30.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-04-23T10:15:30.000Z' })
  updatedAt: Date;

  @Exclude()
  password?: never;
}

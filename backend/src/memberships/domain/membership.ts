import { ApiProperty } from '@nestjs/swagger';

export type MemberRole = 'owner' | 'manager' | 'staff';

export class Membership {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: String })
  organizationId: string;

  @ApiProperty({
    type: String,
    enum: ['owner', 'manager', 'staff'],
  })
  memberRole: MemberRole;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

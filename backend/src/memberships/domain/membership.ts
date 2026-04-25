export type MemberRole = 'owner' | 'manager' | 'staff';

export class Membership {
  id!: string;
  userId!: string;
  organizationId!: string;
  memberRole!: MemberRole;
  createdAt!: Date;
  updatedAt!: Date;
}

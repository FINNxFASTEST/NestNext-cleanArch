import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMongoId } from 'class-validator';
import { MemberRole } from '../domain/membership';

export class CreateMembershipDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  userId: string;

  @ApiProperty({ type: String })
  @IsMongoId()
  organizationId: string;

  @ApiProperty({
    enum: ['owner', 'manager', 'staff'],
    example: 'staff',
  })
  @IsIn(['owner', 'manager', 'staff'])
  memberRole: MemberRole;
}

import { Injectable } from '@nestjs/common';
import { MembershipRepository } from '../../infrastructure/persistence/membership.repository';
import { Membership } from '../../domain/membership';

@Injectable()
export class CreateMembershipUseCase {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  execute(data: {
    userId: string;
    organizationId: string;
    memberRole: Membership['memberRole'];
  }): Promise<Membership> {
    return this.membershipRepository.create(data);
  }
}

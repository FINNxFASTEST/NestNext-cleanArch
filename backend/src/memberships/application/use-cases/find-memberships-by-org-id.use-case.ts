import { Injectable } from '@nestjs/common';
import { MembershipRepository } from '../../infrastructure/persistence/membership.repository';
import { Membership } from '../../domain/membership';

@Injectable()
export class FindMembershipsByOrgIdUseCase {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  execute(organizationId: string): Promise<Membership[]> {
    return this.membershipRepository.findByOrganizationId(organizationId);
  }
}

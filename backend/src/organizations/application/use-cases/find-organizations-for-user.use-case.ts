import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../../infrastructure/persistence/organization.repository';
import { MembershipRepository } from '../../../memberships/infrastructure/persistence/membership.repository';
import { Organization } from '../../domain/organization';

@Injectable()
export class FindOrganizationsForUserUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly membershipRepository: MembershipRepository,
  ) {}

  async execute(userId: string): Promise<Organization[]> {
    const memberships = await this.membershipRepository.findByUserId(userId);
    if (!memberships.length) return [];
    return this.organizationRepository.findByIds(
      memberships.map((m) => m.organizationId),
    );
  }
}

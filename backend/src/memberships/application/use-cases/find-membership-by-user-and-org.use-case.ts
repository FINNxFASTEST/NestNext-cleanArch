import { Injectable } from '@nestjs/common';
import { MembershipRepository } from '../../infrastructure/persistence/membership.repository';
import { Membership } from '../../domain/membership';
import { NullableType } from '../../../utils/types/nullable.type';

@Injectable()
export class FindMembershipByUserAndOrgUseCase {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  execute(
    userId: string,
    organizationId: string,
  ): Promise<NullableType<Membership>> {
    return this.membershipRepository.findByUserAndOrganization(
      userId,
      organizationId,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { MembershipRepository } from '../../infrastructure/persistence/membership.repository';
import { Membership } from '../../domain/membership';

@Injectable()
export class FindMembershipsByIdsUseCase {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  execute(ids: Membership['id'][]): Promise<Membership[]> {
    return this.membershipRepository.findByIds(ids);
  }
}

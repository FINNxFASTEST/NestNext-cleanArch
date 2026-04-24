import { Injectable } from '@nestjs/common';
import { MembershipRepository } from '../../infrastructure/persistence/membership.repository';
import { Membership } from '../../domain/membership';

@Injectable()
export class UpdateMembershipUseCase {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  execute(
    id: Membership['id'],
    payload: Partial<Membership>,
  ): Promise<Membership | null> {
    return this.membershipRepository.update(id, payload);
  }
}

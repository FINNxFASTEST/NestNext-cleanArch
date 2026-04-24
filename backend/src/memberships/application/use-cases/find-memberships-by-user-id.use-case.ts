import { Injectable } from '@nestjs/common';
import { MembershipRepository } from '../../infrastructure/persistence/membership.repository';
import { Membership } from '../../domain/membership';

@Injectable()
export class FindMembershipsByUserIdUseCase {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  execute(userId: string): Promise<Membership[]> {
    return this.membershipRepository.findByUserId(userId);
  }
}

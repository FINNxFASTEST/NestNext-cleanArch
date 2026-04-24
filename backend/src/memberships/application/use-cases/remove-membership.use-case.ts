import { Injectable, NotFoundException } from '@nestjs/common';
import { MembershipRepository } from '../../infrastructure/persistence/membership.repository';
import { Membership } from '../../domain/membership';

@Injectable()
export class RemoveMembershipUseCase {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  async execute(id: Membership['id']): Promise<void> {
    const existing = await this.membershipRepository.findById(id);
    if (!existing) throw new NotFoundException('membershipNotFound');
    await this.membershipRepository.remove(id);
  }
}

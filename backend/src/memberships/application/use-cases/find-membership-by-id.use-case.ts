import { Injectable } from '@nestjs/common';
import { MembershipRepository } from '../../infrastructure/persistence/membership.repository';
import { Membership } from '../../domain/membership';
import { NullableType } from '../../../utils/types/nullable.type';

@Injectable()
export class FindMembershipByIdUseCase {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  execute(id: Membership['id']): Promise<NullableType<Membership>> {
    return this.membershipRepository.findById(id);
  }
}

import { Injectable } from '@nestjs/common';
import { MembershipRepository } from '../../infrastructure/persistence/membership.repository';
import { Membership } from '../../domain/membership';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class FindMembershipsUseCase {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  execute(paginationOptions: IPaginationOptions): Promise<Membership[]> {
    return this.membershipRepository.findAllWithPagination({ paginationOptions });
  }
}

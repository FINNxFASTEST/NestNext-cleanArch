import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../../infrastructure/persistence/organization.repository';
import { Organization } from '../../domain/organization';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class FindOrganizationsUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  execute(paginationOptions: IPaginationOptions): Promise<Organization[]> {
    return this.organizationRepository.findAllWithPagination({
      paginationOptions,
    });
  }
}

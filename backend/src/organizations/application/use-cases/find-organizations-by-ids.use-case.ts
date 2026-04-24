import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../../infrastructure/persistence/organization.repository';
import { Organization } from '../../domain/organization';

@Injectable()
export class FindOrganizationsByIdsUseCase {
  constructor(private readonly organizationRepository: OrganizationRepository) {}

  execute(ids: Organization['id'][]): Promise<Organization[]> {
    return this.organizationRepository.findByIds(ids);
  }
}

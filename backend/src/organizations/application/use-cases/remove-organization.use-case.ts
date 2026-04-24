import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../../infrastructure/persistence/organization.repository';
import { Organization } from '../../domain/organization';

@Injectable()
export class RemoveOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  execute(id: Organization['id']): Promise<void> {
    return this.organizationRepository.remove(id);
  }
}

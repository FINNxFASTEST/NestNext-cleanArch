import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../../infrastructure/persistence/organization.repository';
import { Organization } from '../../domain/organization';
import { NullableType } from '../../../utils/types/nullable.type';

@Injectable()
export class FindOrganizationByIdUseCase {
  constructor(private readonly organizationRepository: OrganizationRepository) {}

  execute(id: Organization['id']): Promise<NullableType<Organization>> {
    return this.organizationRepository.findById(id);
  }
}

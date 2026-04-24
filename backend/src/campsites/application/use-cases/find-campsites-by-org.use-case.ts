import { Injectable } from '@nestjs/common';
import { CampsiteRepository } from '../../infrastructure/persistence/campsite.repository';
import { Campsite } from '../../domain/campsite';

@Injectable()
export class FindCampsitesByOrgUseCase {
  constructor(private readonly campsiteRepository: CampsiteRepository) {}

  execute(organizationId: string): Promise<Campsite[]> {
    return this.campsiteRepository.findByOrganizationId(organizationId);
  }
}

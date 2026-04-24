import { Injectable } from '@nestjs/common';
import { CampsiteRepository } from '../../infrastructure/persistence/campsite.repository';
import { Campsite } from '../../domain/campsite';

@Injectable()
export class FindCampsitesByIdsUseCase {
  constructor(private readonly campsiteRepository: CampsiteRepository) {}

  execute(ids: Campsite['id'][]): Promise<Campsite[]> {
    return this.campsiteRepository.findByIds(ids);
  }
}

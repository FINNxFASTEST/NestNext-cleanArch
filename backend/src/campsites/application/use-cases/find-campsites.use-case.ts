import { Injectable } from '@nestjs/common';
import { CampsiteRepository } from '../../infrastructure/persistence/campsite.repository';
import { Campsite } from '../../domain/campsite';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class FindCampsitesUseCase {
  constructor(private readonly campsiteRepository: CampsiteRepository) {}

  execute(
    paginationOptions: IPaginationOptions,
    filter?: { organizationId?: string; status?: 'active' | 'inactive' },
  ): Promise<Campsite[]> {
    return this.campsiteRepository.findAllWithPagination({
      paginationOptions,
      filter,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { CampsiteRepository } from '../../infrastructure/persistence/campsite.repository';
import { Campsite } from '../../domain/campsite';
import { NullableType } from '../../../utils/types/nullable.type';

@Injectable()
export class FindCampsiteByIdUseCase {
  constructor(private readonly campsiteRepository: CampsiteRepository) {}

  execute(id: Campsite['id']): Promise<NullableType<Campsite>> {
    return this.campsiteRepository.findById(id);
  }
}

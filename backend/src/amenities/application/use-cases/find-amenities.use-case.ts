import { Injectable } from '@nestjs/common';
import { AmenityRepository } from '../../infrastructure/persistence/amenity.repository';
import { Amenity } from '../../domain/amenity';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class FindAmenitiesUseCase {
  constructor(private readonly amenityRepository: AmenityRepository) {}

  execute(
    paginationOptions: IPaginationOptions,
    search?: string,
  ): Promise<Amenity[]> {
    return this.amenityRepository.findAllWithPagination({
      paginationOptions,
      search,
    });
  }
}

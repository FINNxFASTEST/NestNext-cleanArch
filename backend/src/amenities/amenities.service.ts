import { Injectable } from '@nestjs/common';
import { AmenityRepository } from './infrastructure/persistence/amenity.repository';
import { Amenity } from './domain/amenity';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class AmenitiesService {
  constructor(private readonly amenityRepository: AmenityRepository) {}

  create(dto: CreateAmenityDto): Promise<Amenity> {
    return this.amenityRepository.create({
      label: dto.label,
      iconKey: dto.iconKey,
    });
  }

  findAllWithPagination(
    paginationOptions: IPaginationOptions,
    search?: string,
  ): Promise<Amenity[]> {
    return this.amenityRepository.findAllWithPagination({
      paginationOptions,
      search,
    });
  }
}

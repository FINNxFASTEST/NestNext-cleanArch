import { Injectable } from '@nestjs/common';
import { AmenityRepository } from '../../infrastructure/persistence/amenity.repository';
import { Amenity } from '../../domain/amenity';
import { CreateAmenityDto } from '../../presentation/dto/create-amenity.dto';

@Injectable()
export class CreateAmenityUseCase {
  constructor(private readonly amenityRepository: AmenityRepository) {}

  execute(dto: CreateAmenityDto): Promise<Amenity> {
    return this.amenityRepository.create({
      label: dto.label,
      englishName: dto.englishName,
      iconKey: dto.iconKey,
    });
  }
}

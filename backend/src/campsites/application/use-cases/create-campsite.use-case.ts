import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CampsiteRepository } from '../../infrastructure/persistence/campsite.repository';
import { Campsite, CampsiteAmenity, CampsiteLocation, Pitch } from '../../domain/campsite';
import { CreateCampsiteDto } from '../../presentation/dto/create-campsite.dto';

@Injectable()
export class CreateCampsiteUseCase {
  constructor(private readonly campsiteRepository: CampsiteRepository) {}

  async execute(dto: CreateCampsiteDto): Promise<Campsite> {
    const location = new CampsiteLocation();
    location.province = dto.location.province;
    location.district = dto.location.district;
    location.lat = dto.location.lat;
    location.lng = dto.location.lng;

    const pitches: Pitch[] = dto.pitches.map((p) => {
      const pitch = new Pitch();
      pitch.id = randomUUID();
      pitch.type = p.type;
      pitch.name = p.name;
      pitch.maxGuests = p.maxGuests;
      pitch.pricePerNight = p.pricePerNight;
      pitch.size = p.size;
      return pitch;
    });

    return this.campsiteRepository.create({
      organizationId: dto.organizationId,
      name: dto.name,
      description: dto.description ?? null,
      location,
      images: dto.images ?? [],
      amenities: (dto.amenities ?? []).map((a) => {
        const amenity = new CampsiteAmenity();
        amenity.label = a.label;
        amenity.iconKey = a.iconKey;
        return amenity;
      }),
      pitches,
      status: 'active',
    } as Campsite);
  }
}

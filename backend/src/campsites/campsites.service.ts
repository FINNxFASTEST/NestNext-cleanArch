import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';
import { CampsiteRepository } from './infrastructure/persistence/campsite.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Campsite, CampsiteLocation, Pitch } from './domain/campsite';

@Injectable()
export class CampsitesService {
  constructor(private readonly campsiteRepository: CampsiteRepository) {}

  async create(createCampsiteDto: CreateCampsiteDto): Promise<Campsite> {
    const location = new CampsiteLocation();
    location.province = createCampsiteDto.location.province;
    location.district = createCampsiteDto.location.district;
    location.lat = createCampsiteDto.location.lat;
    location.lng = createCampsiteDto.location.lng;

    const pitches: Pitch[] = createCampsiteDto.pitches.map((p) => {
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
      organizationId: createCampsiteDto.organizationId,
      name: createCampsiteDto.name,
      description: createCampsiteDto.description ?? null,
      location,
      images: createCampsiteDto.images ?? [],
      amenities: createCampsiteDto.amenities ?? [],
      pitches,
      status: 'active',
    });
  }

  findAllWithPagination({
    paginationOptions,
    filter,
  }: {
    paginationOptions: IPaginationOptions;
    filter?: { organizationId?: string; status?: 'active' | 'inactive' };
  }) {
    return this.campsiteRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filter,
    });
  }

  findById(id: Campsite['id']) {
    return this.campsiteRepository.findById(id);
  }

  findByIds(ids: Campsite['id'][]) {
    return this.campsiteRepository.findByIds(ids);
  }

  findByOrganizationId(organizationId: string) {
    return this.campsiteRepository.findByOrganizationId(organizationId);
  }

  async update(
    id: Campsite['id'],
    updateCampsiteDto: UpdateCampsiteDto,
  ): Promise<Campsite> {
    const existing = await this.campsiteRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Campsite not found');
    }

    const payload: Partial<Campsite> = {};

    if (updateCampsiteDto.name !== undefined)
      payload.name = updateCampsiteDto.name;
    if (updateCampsiteDto.description !== undefined)
      payload.description = updateCampsiteDto.description ?? null;
    if (updateCampsiteDto.images !== undefined)
      payload.images = updateCampsiteDto.images;
    if (updateCampsiteDto.amenities !== undefined)
      payload.amenities = updateCampsiteDto.amenities;
    if (updateCampsiteDto.status !== undefined)
      payload.status = updateCampsiteDto.status;

    if (updateCampsiteDto.location) {
      const loc = new CampsiteLocation();
      loc.province = updateCampsiteDto.location.province;
      loc.district = updateCampsiteDto.location.district;
      loc.lat = updateCampsiteDto.location.lat;
      loc.lng = updateCampsiteDto.location.lng;
      payload.location = loc;
    }

    if (updateCampsiteDto.pitches) {
      payload.pitches = updateCampsiteDto.pitches.map((p) => {
        const pitch = new Pitch();
        pitch.id = randomUUID();
        pitch.type = p.type;
        pitch.name = p.name;
        pitch.maxGuests = p.maxGuests;
        pitch.pricePerNight = p.pricePerNight;
        pitch.size = p.size;
        return pitch;
      });
    }

    const updated = await this.campsiteRepository.update(id, payload);
    if (!updated) {
      throw new NotFoundException('Campsite not found');
    }
    return updated;
  }

  remove(id: Campsite['id']) {
    return this.campsiteRepository.remove(id);
  }
}

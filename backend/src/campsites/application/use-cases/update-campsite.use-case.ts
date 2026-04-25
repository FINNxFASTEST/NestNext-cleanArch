import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CampsiteRepository } from '../../infrastructure/persistence/campsite.repository';
import { MembershipRepository } from '../../../memberships/infrastructure/persistence/membership.repository';
import { Campsite, CampsiteAmenity, CampsiteLocation, Pitch } from '../../domain/campsite';
import { UpdateCampsiteDto } from '../../presentation/dto/update-campsite.dto';
import { RoleEnum } from '../../../roles/roles.enum';

@Injectable()
export class UpdateCampsiteUseCase {
  constructor(
    private readonly campsiteRepository: CampsiteRepository,
    private readonly membershipRepository: MembershipRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateCampsiteDto,
    actor: { id: string; role?: { id: string | number } },
  ): Promise<Campsite> {
    const existing = await this.campsiteRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('Campsite not found');
    }

    const isAdmin = String(actor.role?.id) === String(RoleEnum.admin);
    if (!isAdmin) {
      const membership =
        await this.membershipRepository.findByUserAndOrganization(
          actor.id,
          existing.organizationId,
        );
      if (!membership) {
        throw new ForbiddenException('Campsite not found');
      }
    }

    const payload: Partial<Campsite> = {};

    if (dto.name !== undefined) payload.name = dto.name;
    if (dto.description !== undefined)
      payload.description = dto.description ?? null;
    if (dto.images !== undefined) payload.images = dto.images;
    if (dto.amenities !== undefined) {
      payload.amenities = dto.amenities.map((a) => {
        const amenity = new CampsiteAmenity();
        amenity.label = a.label;
        amenity.iconKey = a.iconKey;
        return amenity;
      });
    }
    if (dto.status !== undefined) payload.status = dto.status;

    if (dto.location) {
      const loc = new CampsiteLocation();
      loc.province = dto.location.province;
      loc.district = dto.location.district;
      loc.lat = dto.location.lat;
      loc.lng = dto.location.lng;
      payload.location = loc;
    }

    if (dto.pitches) {
      payload.pitches = dto.pitches.map((p) => {
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
}

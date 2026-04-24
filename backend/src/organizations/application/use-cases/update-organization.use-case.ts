import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OrganizationRepository } from '../../infrastructure/persistence/organization.repository';
import { Organization } from '../../domain/organization';
import { UpdateOrganizationDto } from '../../presentation/dto/update-organization.dto';

@Injectable()
export class UpdateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(
    id: Organization['id'],
    dto: UpdateOrganizationDto,
  ): Promise<Organization | null> {
    const existing = await this.organizationRepository.findById(id);
    if (!existing) throw new NotFoundException('organizationNotFound');

    if (dto.slug && dto.slug !== existing.slug) {
      const duplicate = await this.organizationRepository.findBySlug(dto.slug);
      if (duplicate && duplicate.id !== id) {
        throw new UnprocessableEntityException({
          errors: { slug: 'slugAlreadyExists' },
        });
      }
    }

    return this.organizationRepository.update(id, dto);
  }
}

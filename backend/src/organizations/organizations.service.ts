import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationRepository } from './infrastructure/persistence/organization.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Organization } from './domain/organization';
import { MembershipsService } from '../memberships/memberships.service';

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly membershipsService: MembershipsService,
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
    ownerId: string,
  ): Promise<Organization> {
    const existingSlug = await this.organizationRepository.findBySlug(
      createOrganizationDto.slug,
    );
    if (existingSlug) {
      throw new UnprocessableEntityException({
        errors: { slug: 'slugAlreadyExists' },
      });
    }

    const organization = await this.organizationRepository.create({
      name: createOrganizationDto.name,
      slug: createOrganizationDto.slug,
      contactEmail: createOrganizationDto.contactEmail,
      phone: createOrganizationDto.phone ?? null,
      taxId: createOrganizationDto.taxId ?? null,
      bankAccount: createOrganizationDto.bankAccount ?? null,
      status: 'pending',
      ownerId,
    });

    await this.membershipsService.create({
      userId: ownerId,
      organizationId: organization.id,
      memberRole: 'owner',
    });

    return organization;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.organizationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Organization['id']) {
    return this.organizationRepository.findById(id);
  }

  findByIds(ids: Organization['id'][]) {
    return this.organizationRepository.findByIds(ids);
  }

  async findForUser(userId: string): Promise<Organization[]> {
    const memberships = await this.membershipsService.findByUserId(userId);
    if (!memberships.length) return [];
    const orgIds = memberships.map((m) => m.organizationId);
    return this.organizationRepository.findByIds(orgIds);
  }

  async update(
    id: Organization['id'],
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization | null> {
    const existing = await this.organizationRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('organizationNotFound');
    }

    if (
      updateOrganizationDto.slug &&
      updateOrganizationDto.slug !== existing.slug
    ) {
      const duplicate = await this.organizationRepository.findBySlug(
        updateOrganizationDto.slug,
      );
      if (duplicate && duplicate.id !== id) {
        throw new UnprocessableEntityException({
          errors: { slug: 'slugAlreadyExists' },
        });
      }
    }

    return this.organizationRepository.update(id, updateOrganizationDto);
  }

  remove(id: Organization['id']) {
    return this.organizationRepository.remove(id);
  }
}

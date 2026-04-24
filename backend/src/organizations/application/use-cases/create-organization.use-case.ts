import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OrganizationRepository } from '../../infrastructure/persistence/organization.repository';
import { MembershipRepository } from '../../../memberships/infrastructure/persistence/membership.repository';
import { Organization } from '../../domain/organization';
import { CreateOrganizationDto } from '../../presentation/dto/create-organization.dto';

@Injectable()
export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly membershipRepository: MembershipRepository,
  ) {}

  async execute(
    dto: CreateOrganizationDto,
    ownerId: string,
  ): Promise<Organization> {
    const existingSlug = await this.organizationRepository.findBySlug(dto.slug);
    if (existingSlug) {
      throw new UnprocessableEntityException({
        errors: { slug: 'slugAlreadyExists' },
      });
    }

    const organization = await this.organizationRepository.create({
      name: dto.name,
      slug: dto.slug,
      contactEmail: dto.contactEmail,
      phone: dto.phone ?? null,
      taxId: dto.taxId ?? null,
      bankAccount: dto.bankAccount ?? null,
      status: 'pending',
      ownerId,
    });

    await this.membershipRepository.create({
      userId: ownerId,
      organizationId: organization.id,
      memberRole: 'owner',
    });

    return organization;
  }
}

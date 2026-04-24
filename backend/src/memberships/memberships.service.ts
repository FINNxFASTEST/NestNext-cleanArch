import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { MembershipRepository } from './infrastructure/persistence/membership.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Membership } from './domain/membership';

@Injectable()
export class MembershipsService {
  constructor(private readonly membershipRepository: MembershipRepository) {}

  async create(createMembershipDto: CreateMembershipDto): Promise<Membership> {
    return this.membershipRepository.create({
      userId: createMembershipDto.userId,
      organizationId: createMembershipDto.organizationId,
      memberRole: createMembershipDto.memberRole,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Membership[]> {
    return this.membershipRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Membership['id']) {
    return this.membershipRepository.findById(id);
  }

  findByIds(ids: Membership['id'][]) {
    return this.membershipRepository.findByIds(ids);
  }

  findByUserId(userId: string): Promise<Membership[]> {
    return this.membershipRepository.findByUserId(userId);
  }

  findByOrganizationId(organizationId: string): Promise<Membership[]> {
    return this.membershipRepository.findByOrganizationId(organizationId);
  }

  findByUserAndOrganization(userId: string, organizationId: string) {
    return this.membershipRepository.findByUserAndOrganization(
      userId,
      organizationId,
    );
  }

  async update(
    id: Membership['id'],
    updateMembershipDto: UpdateMembershipDto,
  ): Promise<Membership | null> {
    return this.membershipRepository.update(id, updateMembershipDto);
  }

  async remove(id: Membership['id']): Promise<void> {
    const existing = await this.membershipRepository.findById(id);
    if (!existing) {
      throw new NotFoundException('membershipNotFound');
    }
    await this.membershipRepository.remove(id);
  }
}

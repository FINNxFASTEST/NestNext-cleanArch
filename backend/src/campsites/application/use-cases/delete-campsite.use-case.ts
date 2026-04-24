import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CampsiteRepository } from '../../infrastructure/persistence/campsite.repository';
import { MembershipRepository } from '../../../memberships/infrastructure/persistence/membership.repository';
import { RoleEnum } from '../../../roles/roles.enum';

@Injectable()
export class DeleteCampsiteUseCase {
  constructor(
    private readonly campsiteRepository: CampsiteRepository,
    private readonly membershipRepository: MembershipRepository,
  ) {}

  async execute(
    id: string,
    actor: { id: string; role?: { id: string | number } },
  ): Promise<void> {
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

    await this.campsiteRepository.remove(id);
  }
}

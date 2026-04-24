import { Module } from '@nestjs/common';
import { MembershipsPersistenceModule } from './infrastructure/memberships-persistence.module';
import { MembershipsController } from './presentation/memberships.controller';
import { CreateMembershipUseCase } from './application/use-cases/create-membership.use-case';
import { FindMembershipsUseCase } from './application/use-cases/find-memberships.use-case';
import { FindMembershipByIdUseCase } from './application/use-cases/find-membership-by-id.use-case';
import { FindMembershipsByIdsUseCase } from './application/use-cases/find-memberships-by-ids.use-case';
import { FindMembershipsByUserIdUseCase } from './application/use-cases/find-memberships-by-user-id.use-case';
import { FindMembershipsByOrgIdUseCase } from './application/use-cases/find-memberships-by-org-id.use-case';
import { FindMembershipByUserAndOrgUseCase } from './application/use-cases/find-membership-by-user-and-org.use-case';
import { UpdateMembershipUseCase } from './application/use-cases/update-membership.use-case';
import { RemoveMembershipUseCase } from './application/use-cases/remove-membership.use-case';

@Module({
  imports: [MembershipsPersistenceModule],
  controllers: [MembershipsController],
  providers: [
    CreateMembershipUseCase,
    FindMembershipsUseCase,
    FindMembershipByIdUseCase,
    FindMembershipsByIdsUseCase,
    FindMembershipsByUserIdUseCase,
    FindMembershipsByOrgIdUseCase,
    FindMembershipByUserAndOrgUseCase,
    UpdateMembershipUseCase,
    RemoveMembershipUseCase,
  ],
  exports: [
    CreateMembershipUseCase,
    FindMembershipsByUserIdUseCase,
    FindMembershipsByOrgIdUseCase,
    FindMembershipByUserAndOrgUseCase,
    RemoveMembershipUseCase,
    MembershipsPersistenceModule,
  ],
})
export class MembershipsModule {}

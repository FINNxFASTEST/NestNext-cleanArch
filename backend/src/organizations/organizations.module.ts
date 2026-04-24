import { Module } from '@nestjs/common';
import { OrganizationsPersistenceModule } from './infrastructure/organizations-persistence.module';
import { MembershipsPersistenceModule } from '../memberships/infrastructure/memberships-persistence.module';
import { OrganizationsController } from './presentation/organizations.controller';
import { CreateOrganizationUseCase } from './application/use-cases/create-organization.use-case';
import { FindOrganizationsUseCase } from './application/use-cases/find-organizations.use-case';
import { FindOrganizationByIdUseCase } from './application/use-cases/find-organization-by-id.use-case';
import { FindOrganizationsByIdsUseCase } from './application/use-cases/find-organizations-by-ids.use-case';
import { FindOrganizationsForUserUseCase } from './application/use-cases/find-organizations-for-user.use-case';
import { UpdateOrganizationUseCase } from './application/use-cases/update-organization.use-case';
import { RemoveOrganizationUseCase } from './application/use-cases/remove-organization.use-case';

@Module({
  imports: [
    OrganizationsPersistenceModule,
    MembershipsPersistenceModule,
  ],
  controllers: [OrganizationsController],
  providers: [
    CreateOrganizationUseCase,
    FindOrganizationsUseCase,
    FindOrganizationByIdUseCase,
    FindOrganizationsByIdsUseCase,
    FindOrganizationsForUserUseCase,
    UpdateOrganizationUseCase,
    RemoveOrganizationUseCase,
  ],
  exports: [
    FindOrganizationByIdUseCase,
    FindOrganizationsByIdsUseCase,
    FindOrganizationsForUserUseCase,
    OrganizationsPersistenceModule,
  ],
})
export class OrganizationsModule {}

import { Module } from '@nestjs/common';
import { CampsitesPersistenceModule } from './infrastructure/campsites-persistence.module';
import { MembershipsPersistenceModule } from '../memberships/infrastructure/memberships-persistence.module';
import { CampsitesController } from './presentation/campsites.controller';
import { CreateCampsiteUseCase } from './application/use-cases/create-campsite.use-case';
import { FindCampsitesUseCase } from './application/use-cases/find-campsites.use-case';
import { FindCampsiteByIdUseCase } from './application/use-cases/find-campsite-by-id.use-case';
import { FindCampsitesByIdsUseCase } from './application/use-cases/find-campsites-by-ids.use-case';
import { FindCampsitesByOrgUseCase } from './application/use-cases/find-campsites-by-org.use-case';
import { UpdateCampsiteUseCase } from './application/use-cases/update-campsite.use-case';
import { DeleteCampsiteUseCase } from './application/use-cases/delete-campsite.use-case';

@Module({
  imports: [CampsitesPersistenceModule, MembershipsPersistenceModule],
  controllers: [CampsitesController],
  providers: [
    CreateCampsiteUseCase,
    FindCampsitesUseCase,
    FindCampsiteByIdUseCase,
    FindCampsitesByIdsUseCase,
    FindCampsitesByOrgUseCase,
    UpdateCampsiteUseCase,
    DeleteCampsiteUseCase,
  ],
  exports: [
    FindCampsiteByIdUseCase,
    FindCampsitesByIdsUseCase,
    CampsitesPersistenceModule,
  ],
})
export class CampsitesModule {}

import { Module } from '@nestjs/common';
import { CampsitesService } from './campsites.service';
import { CampsitesController } from './campsites.controller';
import { DocumentCampsitePersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { MembershipsModule } from '../memberships/memberships.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [
    DocumentCampsitePersistenceModule,
    MembershipsModule,
    OrganizationsModule,
  ],
  controllers: [CampsitesController],
  providers: [CampsitesService],
  exports: [CampsitesService, DocumentCampsitePersistenceModule],
})
export class CampsitesModule {}

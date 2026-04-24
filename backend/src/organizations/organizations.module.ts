import { forwardRef, Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { DocumentOrganizationPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { MembershipsModule } from '../memberships/memberships.module';

@Module({
  imports: [
    DocumentOrganizationPersistenceModule,
    forwardRef(() => MembershipsModule),
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService, DocumentOrganizationPersistenceModule],
})
export class OrganizationsModule {}

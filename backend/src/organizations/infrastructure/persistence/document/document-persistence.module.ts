import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OrganizationSchema,
  OrganizationSchemaClass,
} from './entities/organization.schema';
import { OrganizationRepository } from '../organization.repository';
import { OrganizationDocumentRepository } from './repositories/organization.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrganizationSchemaClass.name, schema: OrganizationSchema },
    ]),
  ],
  providers: [
    {
      provide: OrganizationRepository,
      useClass: OrganizationDocumentRepository,
    },
  ],
  exports: [OrganizationRepository],
})
export class DocumentOrganizationPersistenceModule {}

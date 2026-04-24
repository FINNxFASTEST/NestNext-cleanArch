import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema, OrganizationSchemaClass } from './persistence/organization.schema';
import { OrganizationRepository } from './persistence/organization.repository';
import { OrganizationDocumentRepository } from './persistence/organization.document-repository';

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
export class OrganizationsPersistenceModule {}

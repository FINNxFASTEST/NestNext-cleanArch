import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampsiteSchemaClass, CampsiteSchema } from './persistence/campsite.schema';
import { CampsiteRepository } from './persistence/campsite.repository';
import { CampsiteDocumentRepository } from './persistence/campsite.document-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CampsiteSchemaClass.name, schema: CampsiteSchema },
    ]),
  ],
  providers: [
    {
      provide: CampsiteRepository,
      useClass: CampsiteDocumentRepository,
    },
  ],
  exports: [CampsiteRepository],
})
export class CampsitesPersistenceModule {}

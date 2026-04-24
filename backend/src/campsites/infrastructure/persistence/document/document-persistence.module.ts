import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CampsiteSchema,
  CampsiteSchemaClass,
} from './entities/campsite.schema';
import { CampsiteRepository } from '../campsite.repository';
import { CampsiteDocumentRepository } from './repositories/campsite.repository';

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
export class DocumentCampsitePersistenceModule {}

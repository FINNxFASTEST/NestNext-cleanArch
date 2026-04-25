import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AmenitySchemaClass, AmenitySchema } from './persistence/amenity.schema';
import { AmenityRepository } from './persistence/amenity.repository';
import { AmenityDocumentRepository } from './persistence/amenity.document-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AmenitySchemaClass.name, schema: AmenitySchema },
    ]),
  ],
  providers: [
    {
      provide: AmenityRepository,
      useClass: AmenityDocumentRepository,
    },
  ],
  exports: [AmenityRepository],
})
export class AmenitiesPersistenceModule {}

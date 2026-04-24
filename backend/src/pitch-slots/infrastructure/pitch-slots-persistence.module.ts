import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PitchSlotSchemaClass,
  PitchSlotSchema,
} from './persistence/pitch-slot.schema';
import { PitchSlotRepository } from './persistence/pitch-slot.repository';
import { PitchSlotDocumentRepository } from './persistence/pitch-slot.document-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PitchSlotSchemaClass.name, schema: PitchSlotSchema },
    ]),
  ],
  providers: [
    {
      provide: PitchSlotRepository,
      useClass: PitchSlotDocumentRepository,
    },
  ],
  exports: [PitchSlotRepository],
})
export class PitchSlotsPersistenceModule {}

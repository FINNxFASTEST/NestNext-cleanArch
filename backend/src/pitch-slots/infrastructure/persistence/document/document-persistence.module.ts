import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PitchSlotSchema,
  PitchSlotSchemaClass,
} from './entities/pitch-slot.schema';
import { PitchSlotRepository } from '../pitch-slot.repository';
import { PitchSlotDocumentRepository } from './repositories/pitch-slot.repository';

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
export class DocumentPitchSlotPersistenceModule {}

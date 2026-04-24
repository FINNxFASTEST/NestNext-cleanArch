import { Module } from '@nestjs/common';
import { PitchSlotsService } from './pitch-slots.service';
import { DocumentPitchSlotPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [DocumentPitchSlotPersistenceModule],
  providers: [PitchSlotsService],
  exports: [PitchSlotsService, DocumentPitchSlotPersistenceModule],
})
export class PitchSlotsModule {}

import { Module } from '@nestjs/common';
import { PitchSlotsPersistenceModule } from './infrastructure/pitch-slots-persistence.module';
import { ReservePitchSlotsUseCase } from './application/use-cases/reserve-pitch-slots.use-case';
import { ReleasePitchSlotsByBookingUseCase } from './application/use-cases/release-pitch-slots-by-booking.use-case';
import { FindPitchSlotsUseCase } from './application/use-cases/find-pitch-slots.use-case';
import { FindPitchSlotByIdUseCase } from './application/use-cases/find-pitch-slot-by-id.use-case';
import { FindPitchSlotsByBookingUseCase } from './application/use-cases/find-pitch-slots-by-booking.use-case';
import { RemovePitchSlotUseCase } from './application/use-cases/remove-pitch-slot.use-case';

@Module({
  imports: [PitchSlotsPersistenceModule],
  providers: [
    ReservePitchSlotsUseCase,
    ReleasePitchSlotsByBookingUseCase,
    FindPitchSlotsUseCase,
    FindPitchSlotByIdUseCase,
    FindPitchSlotsByBookingUseCase,
    RemovePitchSlotUseCase,
  ],
  exports: [
    ReservePitchSlotsUseCase,
    ReleasePitchSlotsByBookingUseCase,
    FindPitchSlotsByBookingUseCase,
    PitchSlotsPersistenceModule,
  ],
})
export class PitchSlotsModule {}

import { Module } from '@nestjs/common';
import { BookingsPersistenceModule } from './infrastructure/bookings-persistence.module';
import { CampsitesPersistenceModule } from '../campsites/infrastructure/campsites-persistence.module';
import { PitchSlotsPersistenceModule } from '../pitch-slots/infrastructure/pitch-slots-persistence.module';
import { MembershipsPersistenceModule } from '../memberships/infrastructure/memberships-persistence.module';
import { BookingsController } from './presentation/bookings.controller';
import { CreateBookingUseCase } from './application/use-cases/create-booking.use-case';
import { FindAllBookingsUseCase } from './application/use-cases/find-all-bookings.use-case';
import { FindBookingByIdUseCase } from './application/use-cases/find-booking-by-id.use-case';
import { CancelBookingUseCase } from './application/use-cases/cancel-booking.use-case';
import { RemoveBookingUseCase } from './application/use-cases/remove-booking.use-case';

@Module({
  imports: [
    BookingsPersistenceModule,
    CampsitesPersistenceModule,
    PitchSlotsPersistenceModule,
    MembershipsPersistenceModule,
  ],
  controllers: [BookingsController],
  providers: [
    CreateBookingUseCase,
    FindAllBookingsUseCase,
    FindBookingByIdUseCase,
    CancelBookingUseCase,
    RemoveBookingUseCase,
  ],
  exports: [BookingsPersistenceModule],
})
export class BookingsModule {}

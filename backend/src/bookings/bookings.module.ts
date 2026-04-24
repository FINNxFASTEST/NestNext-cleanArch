import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { DocumentBookingPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { CampsitesModule } from '../campsites/campsites.module';
import { PitchSlotsModule } from '../pitch-slots/pitch-slots.module';
import { MembershipsModule } from '../memberships/memberships.module';

@Module({
  imports: [
    DocumentBookingPersistenceModule,
    CampsitesModule,
    PitchSlotsModule,
    MembershipsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService, DocumentBookingPersistenceModule],
})
export class BookingsModule {}

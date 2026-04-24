import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema, BookingSchemaClass } from './entities/booking.schema';
import { BookingRepository } from '../booking.repository';
import { BookingDocumentRepository } from './repositories/booking.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookingSchemaClass.name, schema: BookingSchema },
    ]),
  ],
  providers: [
    {
      provide: BookingRepository,
      useClass: BookingDocumentRepository,
    },
  ],
  exports: [BookingRepository],
})
export class DocumentBookingPersistenceModule {}

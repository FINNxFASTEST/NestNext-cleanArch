import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchemaClass, BookingSchema } from './persistence/booking.schema';
import { BookingRepository } from './persistence/booking.repository';
import { BookingDocumentRepository } from './persistence/booking.document-repository';

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
export class BookingsPersistenceModule {}

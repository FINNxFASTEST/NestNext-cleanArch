import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../../infrastructure/persistence/booking.repository';
import { Booking } from '../../domain/booking';
import { NullableType } from '../../../utils/types/nullable.type';

@Injectable()
export class FindBookingByIdUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  execute(id: Booking['id']): Promise<NullableType<Booking>> {
    return this.bookingRepository.findById(id);
  }
}

import { Injectable } from '@nestjs/common';
import { BookingRepository } from '../../infrastructure/persistence/booking.repository';
import { Booking } from '../../domain/booking';

@Injectable()
export class RemoveBookingUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  execute(id: Booking['id']): Promise<void> {
    return this.bookingRepository.remove(id);
  }
}

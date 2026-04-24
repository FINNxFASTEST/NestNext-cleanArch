import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingRepository } from '../../infrastructure/persistence/booking.repository';
import { CampsiteRepository } from '../../../campsites/infrastructure/persistence/campsite.repository';
import { PitchSlotRepository } from '../../../pitch-slots/infrastructure/persistence/pitch-slot.repository';
import { Booking } from '../../domain/booking';
import { CreateBookingDto } from '../../presentation/dto/create-booking.dto';
import {
  BookingActor,
  dayIterator,
  DUPLICATE_KEY_ERROR_CODE,
} from '../helpers/booking.helpers';

type MongoWriteError = { code?: number };

@Injectable()
export class CreateBookingUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly campsiteRepository: CampsiteRepository,
    private readonly pitchSlotRepository: PitchSlotRepository,
  ) {}

  async execute(dto: CreateBookingDto, actor?: BookingActor): Promise<Booking> {
    const { campsiteId, pitchId, checkIn, checkOut, guests } = dto;

    if (checkOut <= checkIn) {
      throw new BadRequestException('checkOut must be after checkIn');
    }

    const nights = dayIterator(checkIn, checkOut);
    if (nights.length === 0) {
      throw new BadRequestException('Booking must span at least one night');
    }

    const campsite = await this.campsiteRepository.findById(campsiteId);
    if (!campsite) {
      throw new NotFoundException('Campsite not found');
    }
    if (campsite.status !== 'active') {
      throw new BadRequestException('Campsite is not accepting bookings');
    }

    const pitch = campsite.pitches.find((p) => p.id === pitchId);
    if (!pitch) {
      throw new NotFoundException('Pitch not found on this campsite');
    }
    if (guests > pitch.maxGuests) {
      throw new BadRequestException(
        `Pitch allows up to ${pitch.maxGuests} guests`,
      );
    }

    const addOns = dto.addOns ?? [];
    const addOnsTotal = addOns.reduce((sum, a) => sum + a.price, 0);
    const totalPrice = nights.length * pitch.pricePerNight + addOnsTotal;

    const booking = await this.bookingRepository.create({
      campsiteId: campsite.id,
      pitchId,
      organizationId: campsite.organizationId,
      userId: actor?.id ? String(actor.id) : null,
      guestName: dto.guestName,
      guestEmail: dto.guestEmail,
      guestPhone: dto.guestPhone ?? null,
      checkIn,
      checkOut,
      guests,
      addOns: addOns.map((a) => ({ name: a.name, price: a.price })),
      totalPrice,
      status: 'pending',
    } as Booking);

    try {
      await this.pitchSlotRepository.reserve(
        nights.map((date) => ({
          pitchId,
          campsiteId: campsite.id,
          bookingId: booking.id,
          date,
        })) as any,
      );
    } catch (err) {
      const code = (err as MongoWriteError)?.code;
      await this.bookingRepository.remove(booking.id);
      await this.pitchSlotRepository.removeByBookingId(booking.id);
      if (code === DUPLICATE_KEY_ERROR_CODE) {
        throw new ConflictException('pitch_already_booked');
      }
      throw err;
    }

    const confirmed = await this.bookingRepository.update(booking.id, {
      status: 'confirmed',
    });
    return confirmed ?? booking;
  }
}

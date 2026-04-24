import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  BookingFilter,
  BookingRepository,
} from './infrastructure/persistence/booking.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Booking } from './domain/booking';
import { CampsitesService } from '../campsites/campsites.service';
import { PitchSlotsService } from '../pitch-slots/pitch-slots.service';
import { RoleEnum } from '../roles/roles.enum';
import { MembershipsService } from '../memberships/memberships.service';

type MongoWriteError = { code?: number };
const DUPLICATE_KEY_ERROR_CODE = 11000;

const MS_IN_DAY = 24 * 60 * 60 * 1000;

function dayIterator(from: Date, to: Date): Date[] {
  const start = new Date(
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()),
  );
  const end = new Date(
    Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate()),
  );
  const dates: Date[] = [];
  for (let t = start.getTime(); t < end.getTime(); t += MS_IN_DAY) {
    dates.push(new Date(t));
  }
  return dates;
}

export type BookingActor = {
  id: string | number;
  roleId?: string | number;
};

function isAdmin(actor: BookingActor): boolean {
  return String(actor.roleId) === String(RoleEnum.admin);
}

function isHost(actor: BookingActor): boolean {
  return String(actor.roleId) === String(RoleEnum.host);
}

@Injectable()
export class BookingsService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly campsitesService: CampsitesService,
    private readonly pitchSlotsService: PitchSlotsService,
    private readonly membershipsService: MembershipsService,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
    actor?: BookingActor,
  ): Promise<Booking> {
    const { campsiteId, pitchId, checkIn, checkOut, guests } = createBookingDto;

    if (checkOut <= checkIn) {
      throw new BadRequestException('checkOut must be after checkIn');
    }

    const nights = dayIterator(checkIn, checkOut);
    if (nights.length === 0) {
      throw new BadRequestException('Booking must span at least one night');
    }

    const campsite = await this.campsitesService.findById(campsiteId);
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

    const addOns = createBookingDto.addOns ?? [];
    const addOnsTotal = addOns.reduce((sum, a) => sum + a.price, 0);
    const totalPrice = nights.length * pitch.pricePerNight + addOnsTotal;

    const booking = await this.bookingRepository.create({
      campsiteId: campsite.id,
      pitchId,
      organizationId: campsite.organizationId,
      userId: actor?.id ? String(actor.id) : null,
      guestName: createBookingDto.guestName,
      guestEmail: createBookingDto.guestEmail,
      guestPhone: createBookingDto.guestPhone ?? null,
      checkIn,
      checkOut,
      guests,
      addOns: addOns.map((a) => ({ name: a.name, price: a.price })),
      totalPrice,
      status: 'pending',
    });

    try {
      await this.pitchSlotsService.reserve(
        nights.map((date) => ({
          pitchId,
          campsiteId: campsite.id,
          bookingId: booking.id,
          date,
        })),
      );
    } catch (err) {
      const code = (err as MongoWriteError)?.code;
      await this.bookingRepository.remove(booking.id);
      await this.pitchSlotsService.releaseByBookingId(booking.id);
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

  async findAllForActor({
    paginationOptions,
    actor,
    filter,
  }: {
    paginationOptions: IPaginationOptions;
    actor: BookingActor;
    filter?: BookingFilter;
  }): Promise<Booking[]> {
    const scopedFilter: BookingFilter = { ...(filter ?? {}) };

    if (isAdmin(actor)) {
      return this.bookingRepository.findAllWithPagination({
        paginationOptions,
        filter: scopedFilter,
      });
    }

    if (isHost(actor)) {
      if (!scopedFilter.organizationId) {
        throw new BadRequestException(
          'organizationId query parameter is required for hosts',
        );
      }
      const membership = await this.membershipsService.findByUserAndOrganization(
        String(actor.id),
        scopedFilter.organizationId,
      );
      if (!membership) {
        throw new ForbiddenException('Not a member of this organization');
      }
      return this.bookingRepository.findAllWithPagination({
        paginationOptions,
        filter: scopedFilter,
      });
    }

    return this.bookingRepository.findAllWithPagination({
      paginationOptions,
      filter: { ...scopedFilter, userId: String(actor.id) },
    });
  }

  findById(id: Booking['id']) {
    return this.bookingRepository.findById(id);
  }

  async cancel(id: Booking['id'], actor: BookingActor): Promise<Booking> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.status === 'cancelled') {
      return booking;
    }

    const isOwner =
      booking.userId && String(booking.userId) === String(actor.id);

    let isOrgMember = false;
    if (!isAdmin(actor) && !isOwner) {
      const membership = await this.membershipsService.findByUserAndOrganization(
        String(actor.id),
        booking.organizationId,
      );
      isOrgMember = !!membership;
    }

    if (!isAdmin(actor) && !isOwner && !isOrgMember) {
      throw new ForbiddenException('Cannot cancel this booking');
    }

    await this.pitchSlotsService.releaseByBookingId(booking.id);
    const updated = await this.bookingRepository.update(booking.id, {
      status: 'cancelled',
    });
    return updated ?? booking;
  }

  remove(id: Booking['id']) {
    return this.bookingRepository.remove(id);
  }
}

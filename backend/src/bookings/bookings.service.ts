import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Campsite,
  CampsiteDocument,
} from '../campsites/schemas/campsite.schema';
import type { IPitch } from '../campsites/interfaces/pitch.interface';
import { isDuplicateKeyError } from '../common/utils/is-duplicate-key-error';
import type { UserRole } from '../users/interfaces/user.interface';
import { CreateBookingDto } from './dto/create-booking.dto';
import type { IBooking } from './interfaces/booking.interface';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { PitchSlot, PitchSlotDocument } from './schemas/pitch-slot.schema';

type EmbeddedPitch = IPitch & { _id?: Types.ObjectId };

type BookingFilter = {
  campsiteId?: Types.ObjectId | { $in: Types.ObjectId[] };
  userId?: Types.ObjectId;
  status?: 'pending' | 'confirmed' | 'cancelled';
};

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(PitchSlot.name)
    private readonly pitchSlotModel: Model<PitchSlotDocument>,
    @InjectModel(Campsite.name)
    private readonly campsiteModel: Model<CampsiteDocument>,
  ) {}

  async create(
    dto: CreateBookingDto,
    userId: string | null,
  ): Promise<BookingDocument> {
    const checkIn = new Date(dto.checkIn);
    const checkOut = new Date(dto.checkOut);

    if (checkIn >= checkOut) {
      throw new BadRequestException('checkOut must be after checkIn');
    }

    const campsite = await this.campsiteModel.findById(dto.campsiteId);
    if (!campsite) throw new NotFoundException('Campsite not found');

    const pitches = campsite.pitches as unknown as EmbeddedPitch[];
    const pitch = pitches.find(
      (p) => (p._id && String(p._id) === dto.pitchId) || p.name === dto.pitchId,
    );
    if (!pitch) throw new NotFoundException('Pitch not found in campsite');

    const nights = Math.round(
      (checkOut.getTime() - checkIn.getTime()) / 86_400_000,
    );
    const addOns = dto.addOns ?? [];
    const totalPrice =
      nights * pitch.pricePerNight +
      addOns.reduce((sum, a) => sum + a.price, 0);

    const dates = Array.from({ length: nights }, (_, i) => {
      const d = new Date(checkIn);
      d.setUTCDate(d.getUTCDate() + i);
      d.setUTCHours(0, 0, 0, 0);
      return d;
    });

    const [booking] = await this.bookingModel.create([
      {
        userId: userId ? new Types.ObjectId(userId) : null,
        campsiteId: new Types.ObjectId(dto.campsiteId),
        pitchId: dto.pitchId,
        guestName: dto.guestName,
        guestEmail: dto.guestEmail,
        guestPhone: dto.guestPhone,
        checkIn,
        checkOut,
        guests: dto.guests,
        addOns,
        totalPrice,
        status: 'pending',
      },
    ]);

    const slots = dates.map((date) => ({
      pitchId: dto.pitchId,
      date,
      bookingId: booking._id,
    }));

    try {
      await this.pitchSlotModel.insertMany(slots, { ordered: true });
    } catch (err: unknown) {
      await this.bookingModel.findByIdAndDelete(booking._id);
      if (isDuplicateKeyError(err)) {
        throw new ConflictException(
          'This pitch is already booked for one or more of the selected nights.',
        );
      }
      throw err;
    }

    await this.bookingModel.findByIdAndUpdate(booking._id, {
      status: 'confirmed',
    });

    const confirmed = await this.bookingModel.findById(booking._id).lean();
    if (!confirmed) {
      throw new NotFoundException('Booking not found after creation');
    }
    return confirmed;
  }

  async findAll(callerId: string, callerRole: UserRole, campsiteId?: string) {
    if (callerRole === 'admin') {
      const filter: BookingFilter = campsiteId
        ? { campsiteId: new Types.ObjectId(campsiteId) }
        : {};
      return this.bookingModel.find(filter).sort({ createdAt: -1 }).lean();
    }

    if (callerRole === 'merchant') {
      const ownedCampsites = await this.campsiteModel
        .find({ ownerId: callerId })
        .select('_id')
        .lean();
      const ids = ownedCampsites.map((c) => c._id);
      const filter: BookingFilter = campsiteId
        ? { campsiteId: new Types.ObjectId(campsiteId) }
        : { campsiteId: { $in: ids } };
      return this.bookingModel.find(filter).sort({ createdAt: -1 }).lean();
    }

    return this.bookingModel
      .find({ userId: new Types.ObjectId(callerId) })
      .sort({ createdAt: -1 })
      .lean();
  }

  async findOne(id: string, callerId: string, callerRole: UserRole) {
    const doc = await this.bookingModel.findById(id).lean();
    if (!doc) throw new NotFoundException('Booking not found');
    await this.assertAccess(doc as unknown as IBooking, callerId, callerRole);
    return doc;
  }

  async cancel(id: string, callerId: string, callerRole: UserRole) {
    const booking = await this.bookingModel.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.status === 'cancelled') {
      throw new BadRequestException('Booking is already cancelled');
    }
    await this.assertAccess(
      booking.toObject() as unknown as IBooking,
      callerId,
      callerRole,
    );

    await this.pitchSlotModel.deleteMany({ bookingId: booking._id });
    booking.status = 'cancelled';
    await booking.save();
    return { success: true as const, bookingId: id };
  }

  async getUnavailableDates(pitchId: string): Promise<Date[]> {
    const slots = await this.pitchSlotModel
      .find({ pitchId })
      .select('date')
      .lean();
    return slots.map((s) => s.date);
  }

  private async assertAccess(
    booking: IBooking,
    callerId: string,
    callerRole: UserRole,
  ): Promise<void> {
    if (callerRole === 'admin') return;
    if (booking.userId && String(booking.userId) === callerId) return;
    if (callerRole === 'merchant') {
      const campsite = await this.campsiteModel
        .findById(booking.campsiteId)
        .select('ownerId')
        .lean();
      if (campsite && String(campsite.ownerId) === callerId) return;
    }
    throw new ForbiddenException('Access denied');
  }
}

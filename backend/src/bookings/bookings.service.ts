import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Campsite, CampsiteDocument } from '../campsites/schemas/campsite.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { PitchSlot, PitchSlotDocument } from './schemas/pitch-slot.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(PitchSlot.name) private readonly pitchSlotModel: Model<PitchSlotDocument>,
    @InjectModel(Campsite.name) private readonly campsiteModel: Model<CampsiteDocument>,
  ) {}

  async create(dto: CreateBookingDto, userId: string | null): Promise<BookingDocument> {
    const checkIn = new Date(dto.checkIn);
    const checkOut = new Date(dto.checkOut);

    if (checkIn >= checkOut) {
      throw new BadRequestException('checkOut must be after checkIn');
    }

    // Fetch campsite to resolve the real pitch price
    const campsite = await this.campsiteModel.findById(dto.campsiteId);
    if (!campsite) throw new NotFoundException('Campsite not found');

    const pitch = campsite.pitches.find((p: any) => String(p._id ?? p.name) === dto.pitchId || p.name === dto.pitchId);
    if (!pitch) throw new NotFoundException('Pitch not found in campsite');

    const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / 86_400_000);
    const addOns = dto.addOns ?? [];
    const totalPrice = nights * pitch.pricePerNight + addOns.reduce((s, a) => s + a.price, 0);

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

    // Atomically claim every night — unique index on (pitchId, date) prevents double-booking
    const slots = dates.map((date) => ({ pitchId: dto.pitchId, date, bookingId: booking._id }));

    try {
      await this.pitchSlotModel.insertMany(slots, { ordered: true });
    } catch (err: any) {
      await this.bookingModel.findByIdAndDelete(booking._id);
      if (err?.code === 11000) {
        throw new ConflictException('This pitch is already booked for one or more of the selected nights.');
      }
      throw err;
    }

    await this.bookingModel.findByIdAndUpdate(booking._id, { status: 'confirmed' });
    return this.bookingModel.findById(booking._id).lean() as Promise<BookingDocument>;
  }

  // Guests see only their own. Merchants see only their campsites'. Admins see all.
  async findAll(callerId: string, callerRole: string, campsiteId?: string) {
    if (callerRole === 'admin') {
      const filter = campsiteId ? { campsiteId: new Types.ObjectId(campsiteId) } : {};
      return this.bookingModel.find(filter).sort({ createdAt: -1 }).lean();
    }

    if (callerRole === 'merchant') {
      // Find all campsites owned by this merchant, then filter bookings
      const ownedCampsites = await this.campsiteModel.find({ ownerId: callerId }).select('_id').lean();
      const ids = ownedCampsites.map((c) => c._id);
      const filter: Record<string, unknown> = { campsiteId: { $in: ids } };
      if (campsiteId) filter.campsiteId = new Types.ObjectId(campsiteId);
      return this.bookingModel.find(filter).sort({ createdAt: -1 }).lean();
    }

    // guest — see only their own bookings
    return this.bookingModel
      .find({ userId: new Types.ObjectId(callerId) })
      .sort({ createdAt: -1 })
      .lean();
  }

  async findOne(id: string, callerId: string, callerRole: string) {
    const doc = await this.bookingModel.findById(id).lean();
    if (!doc) throw new NotFoundException('Booking not found');
    await this.assertAccess(doc, callerId, callerRole);
    return doc;
  }

  async cancel(id: string, callerId: string, callerRole: string) {
    const booking = await this.bookingModel.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.status === 'cancelled') throw new BadRequestException('Booking is already cancelled');
    await this.assertAccess(booking.toObject(), callerId, callerRole);

    await this.pitchSlotModel.deleteMany({ bookingId: booking._id });
    booking.status = 'cancelled';
    await booking.save();
    return { success: true, bookingId: id };
  }

  async getUnavailableDates(pitchId: string): Promise<Date[]> {
    const slots = await this.pitchSlotModel.find({ pitchId }).select('date').lean();
    return slots.map((s) => s.date);
  }

  // A caller can access a booking if they are:
  // - the guest who made it (userId match)
  // - the merchant who owns the campsite
  // - an admin
  private async assertAccess(booking: any, callerId: string, callerRole: string) {
    if (callerRole === 'admin') return;
    if (booking.userId && String(booking.userId) === callerId) return;
    if (callerRole === 'merchant') {
      const campsite = await this.campsiteModel.findById(booking.campsiteId).select('ownerId').lean();
      if (campsite && String(campsite.ownerId) === callerId) return;
    }
    throw new ForbiddenException('Access denied');
  }
}

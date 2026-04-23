import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { PitchSlot, PitchSlotDocument } from './schemas/pitch-slot.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private readonly bookingModel: Model<BookingDocument>,
    @InjectModel(PitchSlot.name) private readonly pitchSlotModel: Model<PitchSlotDocument>,
  ) {}

  async create(dto: CreateBookingDto): Promise<BookingDocument> {
    const checkIn = new Date(dto.checkIn);
    const checkOut = new Date(dto.checkOut);

    if (checkIn >= checkOut) {
      throw new BadRequestException('checkOut must be after checkIn');
    }

    const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / 86_400_000);
    const dates = Array.from({ length: nights }, (_, i) => {
      const d = new Date(checkIn);
      d.setUTCDate(d.getUTCDate() + i);
      d.setUTCHours(0, 0, 0, 0);
      return d;
    });

    const addOns = dto.addOns ?? [];
    const totalPrice = nights * 0 + addOns.reduce((s, a) => s + a.price, 0);
    // Note: actual price will be resolved from campsite.pitches in a future update

    // Create the booking record first (pending)
    const [booking] = await this.bookingModel.create([
      {
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

    // Atomically claim every night via the unique compound index on (pitchId, date).
    // If ANY date is already taken, MongoDB throws a duplicate-key error and we
    // roll back by deleting the booking — no transactions required.
    const slots = dates.map((date) => ({
      pitchId: dto.pitchId,
      date,
      bookingId: booking._id,
    }));

    try {
      await this.pitchSlotModel.insertMany(slots, { ordered: true });
    } catch (err: any) {
      // Duplicate key → another booking already holds one of these nights
      await this.bookingModel.findByIdAndDelete(booking._id);
      if (err?.code === 11000) {
        throw new ConflictException(
          'This pitch is already booked for one or more of the selected nights.',
        );
      }
      throw err;
    }

    // All slots claimed — confirm the booking
    await this.bookingModel.findByIdAndUpdate(booking._id, { status: 'confirmed' });
    return this.bookingModel.findById(booking._id).lean() as Promise<BookingDocument>;
  }

  findAll(campsiteId?: string) {
    const filter = campsiteId ? { campsiteId: new Types.ObjectId(campsiteId) } : {};
    return this.bookingModel.find(filter).sort({ createdAt: -1 }).lean();
  }

  async findOne(id: string) {
    const doc = await this.bookingModel.findById(id).lean();
    if (!doc) throw new NotFoundException('Booking not found');
    return doc;
  }

  async cancel(id: string) {
    const booking = await this.bookingModel.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.status === 'cancelled') {
      throw new BadRequestException('Booking is already cancelled');
    }

    // Release all held pitch slots so others can book those nights
    await this.pitchSlotModel.deleteMany({ bookingId: booking._id });
    booking.status = 'cancelled';
    await booking.save();
    return { success: true, bookingId: id };
  }

  /** Check which nights a pitch is already booked (for the frontend calendar). */
  async getUnavailableDates(pitchId: string): Promise<Date[]> {
    const slots = await this.pitchSlotModel.find({ pitchId }).select('date').lean();
    return slots.map((s) => s.date);
  }
}

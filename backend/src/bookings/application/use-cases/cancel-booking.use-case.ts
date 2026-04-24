import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingRepository } from '../../infrastructure/persistence/booking.repository';
import { MembershipRepository } from '../../../memberships/infrastructure/persistence/membership.repository';
import { PitchSlotRepository } from '../../../pitch-slots/infrastructure/persistence/pitch-slot.repository';
import { Booking } from '../../domain/booking';
import { BookingActor, isAdmin } from '../helpers/booking.helpers';

@Injectable()
export class CancelBookingUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly membershipRepository: MembershipRepository,
    private readonly pitchSlotRepository: PitchSlotRepository,
  ) {}

  async execute(id: Booking['id'], actor: BookingActor): Promise<Booking> {
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
      const membership =
        await this.membershipRepository.findByUserAndOrganization(
          String(actor.id),
          booking.organizationId,
        );
      isOrgMember = !!membership;
    }

    if (!isAdmin(actor) && !isOwner && !isOrgMember) {
      throw new ForbiddenException('Cannot cancel this booking');
    }

    await this.pitchSlotRepository.removeByBookingId(booking.id);
    const updated = await this.bookingRepository.update(booking.id, {
      status: 'cancelled',
    });
    return updated ?? booking;
  }
}

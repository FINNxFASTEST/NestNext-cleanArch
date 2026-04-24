import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  BookingFilter,
  BookingRepository,
} from '../../infrastructure/persistence/booking.repository';
import { MembershipRepository } from '../../../memberships/infrastructure/persistence/membership.repository';
import { Booking } from '../../domain/booking';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { BookingActor, isAdmin, isHost } from '../helpers/booking.helpers';

@Injectable()
export class FindAllBookingsUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly membershipRepository: MembershipRepository,
  ) {}

  async execute({
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
      const membership =
        await this.membershipRepository.findByUserAndOrganization(
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
}

import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';
import type { IAuthUser } from '../auth/interfaces/auth-user.interface';
import { CancelBookingResponseDto } from '../common/dto/cancel-response.dto';
import { BookingsService } from './bookings.service';
import {
  BookingResponseDto,
  UnavailableDatesResponseDto,
} from './dto/booking-response.dto';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post()
  @UseGuards(OptionalJwtGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary:
      'Create a booking. Login optional — userId attached when token present.',
  })
  @ApiCreatedResponse({ type: BookingResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid dates or payload' })
  @ApiNotFoundResponse({ description: 'Campsite or pitch not found' })
  @ApiConflictResponse({
    description: 'Pitch already booked for one or more nights',
  })
  create(@Body() dto: CreateBookingDto, @CurrentUser() user: IAuthUser | null) {
    return this.service.create(dto, user?.userId ?? null);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary:
      'List bookings. Guests see own, merchants see their campsites, admin sees all.',
  })
  @ApiQuery({ name: 'campsiteId', required: false })
  @ApiOkResponse({ type: [BookingResponseDto] })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT' })
  findAll(
    @CurrentUser() user: IAuthUser,
    @Query('campsiteId') campsiteId?: string,
  ) {
    return this.service.findAll(user.userId, user.role, campsiteId);
  }

  @Get('unavailable/:pitchId')
  @ApiOperation({
    summary: 'Return booked dates for a pitch (public, for calendar blocking)',
  })
  @ApiOkResponse({ type: UnavailableDatesResponseDto })
  getUnavailableDates(@Param('pitchId') pitchId: string) {
    return this.service.getUnavailableDates(pitchId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Get booking — accessible by booker, campsite owner, or admin',
  })
  @ApiOkResponse({ type: BookingResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Booking not found' })
  findOne(@Param('id') id: string, @CurrentUser() user: IAuthUser) {
    return this.service.findOne(id, user.userId, user.role);
  }

  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Cancel booking — accessible by booker, campsite owner, or admin',
  })
  @ApiOkResponse({ type: CancelBookingResponseDto })
  @ApiBadRequestResponse({ description: 'Booking is already cancelled' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Booking not found' })
  cancel(@Param('id') id: string, @CurrentUser() user: IAuthUser) {
    return this.service.cancel(id, user.userId, user.role);
  }
}

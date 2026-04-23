import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OptionalJwtGuard } from '../auth/guards/optional-jwt.guard';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

interface AuthUser { userId: string; email: string; role: string; }

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  // Guests may book without an account (userId = null) or while logged in (userId attached)
  @Post()
  @UseGuards(OptionalJwtGuard)
  @ApiOperation({ summary: 'Create a booking. Login optional — userId attached when token present.' })
  create(@Body() dto: CreateBookingDto, @CurrentUser() user?: AuthUser) {
    return this.service.create(dto, user?.userId ?? null);
  }

  // Authenticated: each role sees only what they own
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List bookings. Guests see own, merchants see their campsites, admin sees all.' })
  @ApiQuery({ name: 'campsiteId', required: false })
  findAll(@CurrentUser() user: AuthUser, @Query('campsiteId') campsiteId?: string) {
    return this.service.findAll(user.userId, user.role, campsiteId);
  }

  @Get('unavailable/:pitchId')
  @ApiOperation({ summary: 'Return booked dates for a pitch (public, for calendar blocking)' })
  getUnavailableDates(@Param('pitchId') pitchId: string) {
    return this.service.getUnavailableDates(pitchId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get booking — accessible by booker, campsite owner, or admin' })
  findOne(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.service.findOne(id, user.userId, user.role);
  }

  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Cancel booking — accessible by booker, campsite owner, or admin' })
  cancel(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.service.cancel(id, user.userId, user.role);
  }
}

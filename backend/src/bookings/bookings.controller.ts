import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a booking (race-safe via atomic slot locking)' })
  create(@Body() dto: CreateBookingDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all bookings, optionally filtered by campsite' })
  @ApiQuery({ name: 'campsiteId', required: false })
  findAll(@Query('campsiteId') campsiteId?: string) {
    return this.service.findAll(campsiteId);
  }

  @Get('unavailable/:pitchId')
  @ApiOperation({ summary: 'Return booked dates for a pitch (for calendar blocking)' })
  getUnavailableDates(@Param('pitchId') pitchId: string) {
    return this.service.getUnavailableDates(pitchId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a booking and release its pitch slots' })
  cancel(@Param('id') id: string) {
    return this.service.cancel(id);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Booking } from '../domain/booking';
import { CreateBookingDto } from './dto/create-booking.dto';
import { FindAllBookingsDto } from './dto/find-all-bookings.dto';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../utils/infinity-pagination';
import { OptionalJwtGuard } from '../../auth/guards/optional-jwt.guard';
import { CreateBookingUseCase } from '../application/use-cases/create-booking.use-case';
import { FindAllBookingsUseCase } from '../application/use-cases/find-all-bookings.use-case';
import { FindBookingByIdUseCase } from '../application/use-cases/find-booking-by-id.use-case';
import { CancelBookingUseCase } from '../application/use-cases/cancel-booking.use-case';

type AuthedRequest = {
  user?: { id: string; role?: { id: string | number } };
};

@ApiTags('Bookings')
@Controller({ path: 'bookings', version: '1' })
export class BookingsController {
  constructor(
    private readonly createBooking: CreateBookingUseCase,
    private readonly findAllBookings: FindAllBookingsUseCase,
    private readonly findBookingById: FindBookingByIdUseCase,
    private readonly cancelBooking: CancelBookingUseCase,
  ) {}

  @Post()
  @UseGuards(OptionalJwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Booking })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBookingDto, @Req() req: AuthedRequest) {
    const actor = req.user
      ? { id: req.user.id, roleId: req.user.role?.id }
      : undefined;
    return this.createBooking.execute(dto, actor);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: InfinityPaginationResponse(Booking) })
  async findAll(
    @Query() query: FindAllBookingsDto,
    @Req() req: AuthedRequest,
  ): Promise<InfinityPaginationResponseDto<Booking>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) limit = 50;

    const bookings = await this.findAllBookings.execute({
      paginationOptions: { page, limit },
      actor: { id: req.user!.id, roleId: req.user!.role?.id },
      filter: { organizationId: query.organizationId, status: query.status },
    });

    return infinityPagination(bookings, { page, limit });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Booking })
  findById(@Param('id') id: string) {
    return this.findBookingById.execute(id);
  }

  @Patch(':id/cancel')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Booking })
  cancel(@Param('id') id: string, @Req() req: AuthedRequest) {
    return this.cancelBooking.execute(id, {
      id: req.user!.id,
      roleId: req.user!.role?.id,
    });
  }
}

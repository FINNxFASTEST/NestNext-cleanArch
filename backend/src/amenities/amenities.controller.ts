import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { Amenity } from './domain/amenity';
import { AmenitiesService } from './amenities.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { FindAllAmenitiesDto } from './dto/find-all-amenities.dto';

@ApiTags('Amenities')
@Controller({ path: 'amenities', version: '1' })
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Get()
  @ApiOkResponse({ type: InfinityPaginationResponse(Amenity) })
  async findAll(
    @Query() query: FindAllAmenitiesDto,
  ): Promise<InfinityPaginationResponseDto<Amenity>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 20;
    if (limit > 100) limit = 100;

    const results = await this.amenitiesService.findAllWithPagination(
      { page, limit },
      query.search,
    );
    return infinityPagination(results, { page, limit });
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.admin, RoleEnum.host)
  @ApiCreatedResponse({ type: Amenity })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateAmenityDto): Promise<Amenity> {
    return this.amenitiesService.create(dto);
  }
}

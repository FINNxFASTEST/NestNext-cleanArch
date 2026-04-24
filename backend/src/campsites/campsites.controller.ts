import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { CampsitesService } from './campsites.service';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';
import { Campsite } from './domain/campsite';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllCampsitesDto } from './dto/find-all-campsites.dto';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { OrganizationScopeGuard } from '../common/guards/organization-scope.guard';
import { ScopedOrg } from '../common/decorators/scoped-org.decorator';
import { MembershipsService } from '../memberships/memberships.service';

type AuthedRequest = {
  user?: { id: string; role?: { id: string | number } };
  scopedOrganizationId?: string;
};

@ApiTags('Campsites')
@Controller({
  path: 'campsites',
  version: '1',
})
export class CampsitesController {
  constructor(
    private readonly campsitesService: CampsitesService,
    private readonly membershipsService: MembershipsService,
  ) {}

  @Get()
  @ApiOkResponse({ type: InfinityPaginationResponse(Campsite) })
  async findAll(
    @Query() query: FindAllCampsitesDto,
  ): Promise<InfinityPaginationResponseDto<Campsite>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) limit = 50;

    const results = await this.campsitesService.findAllWithPagination({
      paginationOptions: { page, limit },
      filter: {
        organizationId: query.organizationId,
        status: query.status ?? 'active',
      },
    });
    return infinityPagination(results, { page, limit });
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Campsite })
  async findById(@Param('id') id: string) {
    const campsite = await this.campsitesService.findById(id);
    if (!campsite) {
      throw new NotFoundException('Campsite not found');
    }
    return campsite;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard, OrganizationScopeGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.admin, RoleEnum.host)
  @ScopedOrg({ body: 'organizationId' })
  @ApiCreatedResponse({ type: Campsite })
  create(@Body() dto: CreateCampsiteDto) {
    return this.campsitesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.admin, RoleEnum.host)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Campsite })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCampsiteDto,
    @Req() req: AuthedRequest,
  ) {
    await this.ensureCanMutate(id, req);
    return this.campsitesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.admin, RoleEnum.host)
  @ApiParam({ name: 'id', type: String, required: true })
  async remove(@Param('id') id: string, @Req() req: AuthedRequest) {
    await this.ensureCanMutate(id, req);
    return this.campsitesService.remove(id);
  }

  private async ensureCanMutate(id: string, req: AuthedRequest) {
    const campsite = await this.campsitesService.findById(id);
    if (!campsite) {
      throw new NotFoundException('Campsite not found');
    }

    const user = req.user;
    if (!user) {
      throw new BadRequestException('authenticationRequired');
    }

    const isAdmin = String(user.role?.id) === String(RoleEnum.admin);
    if (isAdmin) return;

    const membership = await this.membershipsService.findByUserAndOrganization(
      user.id,
      campsite.organizationId,
    );
    if (!membership) {
      throw new NotFoundException('Campsite not found');
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { Campsite } from '../domain/campsite';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../utils/infinity-pagination';
import { Roles } from '../../roles/roles.decorator';
import { RoleEnum } from '../../roles/roles.enum';
import { RolesGuard } from '../../roles/roles.guard';
import { OrganizationScopeGuard } from '../../common/guards/organization-scope.guard';
import { ScopedOrg } from '../../common/decorators/scoped-org.decorator';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';
import { FindAllCampsitesDto } from './dto/find-all-campsites.dto';
import { CreateCampsiteUseCase } from '../application/use-cases/create-campsite.use-case';
import { FindCampsitesUseCase } from '../application/use-cases/find-campsites.use-case';
import { FindCampsiteByIdUseCase } from '../application/use-cases/find-campsite-by-id.use-case';
import { UpdateCampsiteUseCase } from '../application/use-cases/update-campsite.use-case';
import { DeleteCampsiteUseCase } from '../application/use-cases/delete-campsite.use-case';

type AuthedRequest = {
  user?: { id: string; role?: { id: string | number } };
};

@ApiTags('Campsites')
@Controller({ path: 'campsites', version: '1' })
export class CampsitesController {
  constructor(
    private readonly createCampsite: CreateCampsiteUseCase,
    private readonly findCampsites: FindCampsitesUseCase,
    private readonly findCampsiteById: FindCampsiteByIdUseCase,
    private readonly updateCampsite: UpdateCampsiteUseCase,
    private readonly deleteCampsite: DeleteCampsiteUseCase,
  ) {}

  @Get()
  @ApiOkResponse({ type: InfinityPaginationResponse(Campsite) })
  async findAll(
    @Query() query: FindAllCampsitesDto,
  ): Promise<InfinityPaginationResponseDto<Campsite>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) limit = 50;

    const results = await this.findCampsites.execute(
      { page, limit },
      {
        organizationId: query.organizationId,
        status: query.status ?? 'active',
      },
    );
    return infinityPagination(results, { page, limit });
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Campsite })
  async findById(@Param('id') id: string) {
    const campsite = await this.findCampsiteById.execute(id);
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
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCampsiteDto) {
    return this.createCampsite.execute(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.admin, RoleEnum.host)
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Campsite })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCampsiteDto,
    @Req() req: AuthedRequest,
  ) {
    return this.updateCampsite.execute(id, dto, req.user!);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @Roles(RoleEnum.admin, RoleEnum.host)
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() req: AuthedRequest) {
    return this.deleteCampsite.execute(id, req.user!);
  }
}

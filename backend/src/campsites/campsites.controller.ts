import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
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
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import type { IAuthUser } from '../auth/interfaces/auth-user.interface';
import { SuccessResponseDto } from '../common/dto/cancel-response.dto';
import { CampsitesService } from './campsites.service';
import { CampsiteResponseDto } from './dto/campsite-response.dto';
import { CreateCampsiteDto } from './dto/create-campsite.dto';
import { UpdateCampsiteDto } from './dto/update-campsite.dto';

@ApiTags('campsites')
@Controller('campsites')
export class CampsitesController {
  constructor(private readonly service: CampsitesService) {}

  @Get()
  @ApiOperation({
    summary: 'List active campsites. Pass ownerId to filter by merchant.',
  })
  @ApiQuery({ name: 'ownerId', required: false })
  @ApiOkResponse({ type: [CampsiteResponseDto] })
  findAll(@Query('ownerId') ownerId?: string) {
    return this.service.findAll(ownerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campsite detail' })
  @ApiOkResponse({ type: CampsiteResponseDto })
  @ApiNotFoundResponse({ description: 'Campsite not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('merchant', 'admin')
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: 'Create a campsite (merchant/admin)' })
  @ApiCreatedResponse({ type: CampsiteResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT' })
  @ApiForbiddenResponse({ description: 'Role not permitted' })
  create(@CurrentUser() user: IAuthUser, @Body() dto: CreateCampsiteDto) {
    return this.service.create(user.userId, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('merchant', 'admin')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Update campsite — only owner or admin can do this',
  })
  @ApiOkResponse({ type: CampsiteResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT' })
  @ApiForbiddenResponse({ description: 'Not the owner' })
  @ApiNotFoundResponse({ description: 'Campsite not found' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: IAuthUser,
    @Body() dto: UpdateCampsiteDto,
  ) {
    return this.service.update(id, user.userId, user.role, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('merchant', 'admin')
  @ApiBearerAuth('bearer')
  @ApiOperation({
    summary: 'Deactivate campsite — only owner or admin can do this',
  })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT' })
  @ApiForbiddenResponse({ description: 'Not the owner' })
  @ApiNotFoundResponse({ description: 'Campsite not found' })
  remove(@Param('id') id: string, @CurrentUser() user: IAuthUser) {
    return this.service.remove(id, user.userId, user.role);
  }
}

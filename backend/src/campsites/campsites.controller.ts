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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CampsitesService } from './campsites.service';
import { CreateCampsiteDto } from './dto/create-campsite.dto';

interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

@ApiTags('campsites')
@Controller('campsites')
export class CampsitesController {
  constructor(private readonly service: CampsitesService) {}

  // Public: anyone can browse listings
  @Get()
  @ApiOperation({
    summary: 'List active campsites. Pass ownerId to filter by merchant.',
  })
  @ApiQuery({ name: 'ownerId', required: false })
  findAll(@Query('ownerId') ownerId?: string) {
    return this.service.findAll(ownerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campsite detail' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // Protected: merchant/admin only
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('merchant', 'admin')
  @ApiOperation({ summary: 'Create a campsite (merchant/admin)' })
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateCampsiteDto) {
    return this.service.create(user.userId, dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('merchant', 'admin')
  @ApiOperation({
    summary: 'Update campsite — only owner or admin can do this',
  })
  update(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() dto: Partial<CreateCampsiteDto>,
  ) {
    return this.service.update(id, user.userId, user.role, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('merchant', 'admin')
  @ApiOperation({
    summary: 'Deactivate campsite — only owner or admin can do this',
  })
  remove(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.service.remove(id, user.userId, user.role);
  }
}

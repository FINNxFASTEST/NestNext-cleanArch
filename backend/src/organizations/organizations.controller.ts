import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Organization } from './domain/organization';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { OrganizationScopeGuard } from '../common/guards/organization-scope.guard';
import { ScopedOrg } from '../common/decorators/scoped-org.decorator';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'organizations', version: '1' })
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @Roles(RoleEnum.admin, RoleEnum.host)
  @ApiCreatedResponse({ type: Organization })
  @HttpCode(HttpStatus.CREATED)
  create(@Request() req, @Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationsService.create(createOrganizationDto, req.user.id);
  }

  @Get('mine')
  @Roles(RoleEnum.admin, RoleEnum.host)
  @ApiOkResponse({ type: [Organization] })
  async findMine(@Request() req): Promise<Organization[]> {
    if (req.user.role?.id?.toString() === RoleEnum.admin.toString()) {
      return this.organizationsService.findAllWithPagination({
        paginationOptions: { page: 1, limit: 200 },
      });
    }
    return this.organizationsService.findForUser(req.user.id);
  }

  @Get(':id')
  @Roles(RoleEnum.admin, RoleEnum.host)
  @UseGuards(OrganizationScopeGuard)
  @ScopedOrg({ param: 'id' })
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Organization })
  findById(@Param('id') id: string) {
    return this.organizationsService.findById(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.admin, RoleEnum.host)
  @UseGuards(OrganizationScopeGuard)
  @ScopedOrg({ param: 'id', requireMemberRole: ['owner', 'manager'] })
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Organization })
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin)
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(id);
  }
}

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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Organization } from '../domain/organization';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../roles/roles.decorator';
import { RoleEnum } from '../../roles/roles.enum';
import { RolesGuard } from '../../roles/roles.guard';
import { OrganizationScopeGuard } from '../../common/guards/organization-scope.guard';
import { ScopedOrg } from '../../common/decorators/scoped-org.decorator';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { CreateOrganizationUseCase } from '../application/use-cases/create-organization.use-case';
import { FindOrganizationsUseCase } from '../application/use-cases/find-organizations.use-case';
import { FindOrganizationByIdUseCase } from '../application/use-cases/find-organization-by-id.use-case';
import { FindOrganizationsForUserUseCase } from '../application/use-cases/find-organizations-for-user.use-case';
import { UpdateOrganizationUseCase } from '../application/use-cases/update-organization.use-case';
import { RemoveOrganizationUseCase } from '../application/use-cases/remove-organization.use-case';

@ApiTags('Organizations')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'organizations', version: '1' })
export class OrganizationsController {
  constructor(
    private readonly createOrganization: CreateOrganizationUseCase,
    private readonly findOrganizations: FindOrganizationsUseCase,
    private readonly findOrganizationById: FindOrganizationByIdUseCase,
    private readonly findOrganizationsForUser: FindOrganizationsForUserUseCase,
    private readonly updateOrganization: UpdateOrganizationUseCase,
    private readonly removeOrganization: RemoveOrganizationUseCase,
  ) {}

  @Post()
  @Roles(RoleEnum.admin, RoleEnum.host)
  @ApiCreatedResponse({ type: Organization })
  @HttpCode(HttpStatus.CREATED)
  create(@Request() req, @Body() dto: CreateOrganizationDto) {
    return this.createOrganization.execute(dto, req.user.id);
  }

  @Get('mine')
  @Roles(RoleEnum.admin, RoleEnum.host)
  @ApiOkResponse({ type: [Organization] })
  async findMine(@Request() req): Promise<Organization[]> {
    if (req.user.role?.id?.toString() === RoleEnum.admin.toString()) {
      return this.findOrganizations.execute({ page: 1, limit: 200 });
    }
    return this.findOrganizationsForUser.execute(req.user.id);
  }

  @Get(':id')
  @Roles(RoleEnum.admin, RoleEnum.host)
  @UseGuards(OrganizationScopeGuard)
  @ScopedOrg({ param: 'id' })
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Organization })
  findById(@Param('id') id: string) {
    return this.findOrganizationById.execute(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.admin, RoleEnum.host)
  @UseGuards(OrganizationScopeGuard)
  @ScopedOrg({ param: 'id', requireMemberRole: ['owner', 'manager'] })
  @ApiParam({ name: 'id', type: String, required: true })
  @ApiOkResponse({ type: Organization })
  update(@Param('id') id: string, @Body() dto: UpdateOrganizationDto) {
    return this.updateOrganization.execute(id, dto);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin)
  @ApiParam({ name: 'id', type: String, required: true })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.removeOrganization.execute(id);
  }
}

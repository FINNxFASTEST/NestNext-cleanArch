import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Membership } from '../domain/membership';
import { Roles } from '../../roles/roles.decorator';
import { RoleEnum } from '../../roles/roles.enum';
import { RolesGuard } from '../../roles/roles.guard';
import { OrganizationScopeGuard } from '../../common/guards/organization-scope.guard';
import { ScopedOrg } from '../../common/decorators/scoped-org.decorator';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { FindMembershipsByOrgIdUseCase } from '../application/use-cases/find-memberships-by-org-id.use-case';
import { CreateMembershipUseCase } from '../application/use-cases/create-membership.use-case';
import { FindMembershipsByUserIdUseCase } from '../application/use-cases/find-memberships-by-user-id.use-case';
import { RemoveMembershipUseCase } from '../application/use-cases/remove-membership.use-case';

@ApiTags('Memberships')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'memberships', version: '1' })
export class MembershipsController {
  constructor(
    private readonly findMembershipsByOrgId: FindMembershipsByOrgIdUseCase,
    private readonly createMembership: CreateMembershipUseCase,
    private readonly findMembershipsByUserId: FindMembershipsByUserIdUseCase,
    private readonly removeMembership: RemoveMembershipUseCase,
  ) {}

  @Get()
  @Roles(RoleEnum.admin, RoleEnum.host)
  @UseGuards(OrganizationScopeGuard)
  @ScopedOrg({ query: 'organizationId' })
  @ApiQuery({ name: 'organizationId', required: true })
  @ApiOkResponse({ type: [Membership] })
  findAll(@Query('organizationId') organizationId: string) {
    return this.findMembershipsByOrgId.execute(organizationId);
  }

  @Post('invite')
  @Roles(RoleEnum.admin, RoleEnum.host)
  @UseGuards(OrganizationScopeGuard)
  @ScopedOrg({ body: 'organizationId', requireMemberRole: ['owner', 'manager'] })
  @ApiCreatedResponse({ type: Membership })
  @HttpCode(HttpStatus.CREATED)
  invite(@Body() dto: CreateMembershipDto): Promise<Membership> {
    return this.createMembership.execute(dto);
  }

  @Get('me')
  @ApiOkResponse({ type: [Membership] })
  findMine(@Request() req): Promise<Membership[]> {
    return this.findMembershipsByUserId.execute(req.user.id);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin, RoleEnum.host)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.removeMembership.execute(id);
  }
}

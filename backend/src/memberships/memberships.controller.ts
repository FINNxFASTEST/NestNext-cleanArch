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
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { Membership } from './domain/membership';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { RolesGuard } from '../roles/roles.guard';
import { OrganizationScopeGuard } from '../common/guards/organization-scope.guard';
import { ScopedOrg } from '../common/decorators/scoped-org.decorator';

@ApiTags('Memberships')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({ path: 'memberships', version: '1' })
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Get()
  @Roles(RoleEnum.admin, RoleEnum.host)
  @UseGuards(OrganizationScopeGuard)
  @ScopedOrg({ query: 'organizationId' })
  @ApiQuery({ name: 'organizationId', required: true })
  @ApiOkResponse({ type: [Membership] })
  findAll(@Query('organizationId') organizationId: string) {
    return this.membershipsService.findByOrganizationId(organizationId);
  }

  @Post('invite')
  @Roles(RoleEnum.admin, RoleEnum.host)
  @UseGuards(OrganizationScopeGuard)
  @ScopedOrg({
    body: 'organizationId',
    requireMemberRole: ['owner', 'manager'],
  })
  @ApiCreatedResponse({ type: Membership })
  @HttpCode(HttpStatus.CREATED)
  invite(@Body() dto: CreateMembershipDto): Promise<Membership> {
    return this.membershipsService.create(dto);
  }

  @Get('me')
  @ApiOkResponse({ type: [Membership] })
  findMine(@Request() req): Promise<Membership[]> {
    return this.membershipsService.findByUserId(req.user.id);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin, RoleEnum.host)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.membershipsService.remove(id);
  }
}

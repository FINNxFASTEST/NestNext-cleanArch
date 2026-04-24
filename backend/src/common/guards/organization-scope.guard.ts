import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FindMembershipByUserAndOrgUseCase } from '../../memberships/application/use-cases/find-membership-by-user-and-org.use-case';
import { FindOrganizationByIdUseCase } from '../../organizations/application/use-cases/find-organization-by-id.use-case';
import { RoleEnum } from '../../roles/roles.enum';
import {
  SCOPED_ORG_KEY,
  ScopedOrgOptions,
} from '../decorators/scoped-org.decorator';

type AuthenticatedRequest = {
  user?: { id: string; role?: { id: string | number } };
  params: Record<string, string>;
  body: Record<string, unknown>;
  query: Record<string, unknown>;
  scopedOrganizationId?: string;
  scopedMemberRole?: string;
};

@Injectable()
export class OrganizationScopeGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly findMembershipByUserAndOrg: FindMembershipByUserAndOrgUseCase,
    private readonly findOrganizationById: FindOrganizationByIdUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.getAllAndOverride<ScopedOrgOptions>(
      SCOPED_ORG_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!options) return true;

    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = req.user;
    if (!user) {
      throw new ForbiddenException('authenticationRequired');
    }

    const organizationId = this.readOrganizationId(req, options);
    if (!organizationId) {
      throw new BadRequestException('organizationIdRequired');
    }

    req.scopedOrganizationId = organizationId;

    const isAdmin = user.role?.id?.toString() === RoleEnum.admin.toString();
    if (isAdmin) {
      req.scopedMemberRole = 'admin';
      return true;
    }

    const organization =
      await this.findOrganizationById.execute(organizationId);
    if (!organization) {
      throw new ForbiddenException('organizationNotFound');
    }

    const membership = await this.findMembershipByUserAndOrg.execute(
      user.id,
      organizationId,
    );
    if (!membership) {
      throw new ForbiddenException('notAMemberOfOrganization');
    }

    if (
      options.requireMemberRole &&
      !options.requireMemberRole.includes(membership.memberRole)
    ) {
      throw new ForbiddenException('insufficientMemberRole');
    }

    req.scopedMemberRole = membership.memberRole;
    return true;
  }

  private readOrganizationId(
    req: AuthenticatedRequest,
    options: ScopedOrgOptions,
  ): string | undefined {
    if (options.param) {
      return req.params?.[options.param];
    }
    if (options.body) {
      const value = req.body?.[options.body];
      return typeof value === 'string' ? value : undefined;
    }
    if (options.query) {
      const value = req.query?.[options.query];
      return typeof value === 'string' ? value : undefined;
    }
    return undefined;
  }
}

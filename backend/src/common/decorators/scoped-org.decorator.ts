import { SetMetadata } from '@nestjs/common';
import { MemberRole } from '../../memberships/domain/membership';

export const SCOPED_ORG_KEY = 'scopedOrg';

export type ScopedOrgSource =
  | { param: string; body?: undefined; query?: undefined }
  | { body: string; param?: undefined; query?: undefined }
  | { query: string; param?: undefined; body?: undefined };

export type ScopedOrgOptions = ScopedOrgSource & {
  requireMemberRole?: MemberRole[];
};

/**
 * Marks a handler as organization-scoped. The OrganizationScopeGuard will
 * read the organizationId from the given request location and enforce that
 * the current user has a matching Membership (admins bypass).
 */
export const ScopedOrg = (options: ScopedOrgOptions) =>
  SetMetadata(SCOPED_ORG_KEY, options);

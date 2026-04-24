import { Module } from '@nestjs/common';
import { MembershipsModule } from '../memberships/memberships.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { OrganizationScopeGuard } from './guards/organization-scope.guard';

@Module({
  imports: [MembershipsModule, OrganizationsModule],
  providers: [OrganizationScopeGuard],
  exports: [OrganizationScopeGuard, MembershipsModule, OrganizationsModule],
})
export class CommonModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSeedService } from './tenant-seed.service';
import {
  OrganizationSchemaClass,
  OrganizationSchema,
} from '../../../../organizations/infrastructure/persistence/document/entities/organization.schema';
import {
  MembershipSchemaClass,
  MembershipSchema,
} from '../../../../memberships/infrastructure/persistence/document/entities/membership.schema';
import {
  CampsiteSchemaClass,
  CampsiteSchema,
} from '../../../../campsites/infrastructure/persistence/document/entities/campsite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrganizationSchemaClass.name, schema: OrganizationSchema },
      { name: MembershipSchemaClass.name, schema: MembershipSchema },
      { name: CampsiteSchemaClass.name, schema: CampsiteSchema },
    ]),
  ],
  providers: [TenantSeedService],
  exports: [TenantSeedService],
})
export class TenantSeedModule {}

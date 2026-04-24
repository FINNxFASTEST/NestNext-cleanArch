import {
  // do not remove this comment
  forwardRef,
  Module,
} from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';
import { DocumentMembershipPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [
    // do not remove this comment
    DocumentMembershipPersistenceModule,
    forwardRef(() => OrganizationsModule),
  ],
  controllers: [MembershipsController],
  providers: [MembershipsService],
  exports: [MembershipsService, DocumentMembershipPersistenceModule],
})
export class MembershipsModule {}

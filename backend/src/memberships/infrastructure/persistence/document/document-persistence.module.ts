import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MembershipSchema,
  MembershipSchemaClass,
} from './entities/membership.schema';
import { MembershipRepository } from '../membership.repository';
import { MembershipDocumentRepository } from './repositories/membership.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MembershipSchemaClass.name, schema: MembershipSchema },
    ]),
  ],
  providers: [
    {
      provide: MembershipRepository,
      useClass: MembershipDocumentRepository,
    },
  ],
  exports: [MembershipRepository],
})
export class DocumentMembershipPersistenceModule {}

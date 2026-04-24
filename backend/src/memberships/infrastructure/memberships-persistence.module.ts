import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MembershipSchema, MembershipSchemaClass } from './persistence/membership.schema';
import { MembershipRepository } from './persistence/membership.repository';
import { MembershipDocumentRepository } from './persistence/membership.document-repository';

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
export class MembershipsPersistenceModule {}

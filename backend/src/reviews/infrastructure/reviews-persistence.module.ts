import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchemaClass, ReviewSchema } from './persistence/review.schema';
import { ReviewRepository } from './persistence/review.repository';
import { ReviewDocumentRepository } from './persistence/review.document-repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ReviewSchemaClass.name, schema: ReviewSchema },
    ]),
  ],
  providers: [
    { provide: ReviewRepository, useClass: ReviewDocumentRepository },
  ],
  exports: [ReviewRepository],
})
export class ReviewsPersistenceModule {}

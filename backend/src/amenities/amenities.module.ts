import { Module } from '@nestjs/common';
import { AmenitiesPersistenceModule } from './infrastructure/amenities-persistence.module';
import { AmenitiesController } from './amenities.controller';
import { AmenitiesService } from './amenities.service';

@Module({
  imports: [AmenitiesPersistenceModule],
  controllers: [AmenitiesController],
  providers: [AmenitiesService],
  exports: [AmenitiesService],
})
export class AmenitiesModule {}

import { Module } from '@nestjs/common';
import { AmenitiesPersistenceModule } from './infrastructure/amenities-persistence.module';
import { AmenitiesController } from './presentation/amenity.controller';
import { CreateAmenityUseCase } from './application/use-cases/create-amenity.use-case';
import { FindAmenitiesUseCase } from './application/use-cases/find-amenities.use-case';

@Module({
  imports: [AmenitiesPersistenceModule],
  controllers: [AmenitiesController],
  providers: [CreateAmenityUseCase, FindAmenitiesUseCase],
  exports: [FindAmenitiesUseCase],
})
export class AmenitiesModule {}

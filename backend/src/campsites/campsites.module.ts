import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampsitesController } from './campsites.controller';
import { CampsitesService } from './campsites.service';
import { Campsite, CampsiteSchema } from './schemas/campsite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Campsite.name, schema: CampsiteSchema },
    ]),
  ],
  controllers: [CampsitesController],
  providers: [CampsitesService],
  exports: [CampsitesService],
})
export class CampsitesModule {}

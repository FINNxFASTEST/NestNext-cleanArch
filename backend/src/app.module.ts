import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import appConfig from './config/app.config';
import authConfig from './auth/config/auth.config';
import databaseConfig from './database/config/database.config';

import { MongooseConfigService } from './database/mongoose-config.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { MembershipsModule } from './memberships/memberships.module';
import { CommonModule } from './common/common.module';

import { CampsitesModule } from './campsites/campsites.module';

import { BookingsModule } from './bookings/bookings.module';

import { PitchSlotsModule } from './pitch-slots/pitch-slots.module';

@Module({
  imports: [
    PitchSlotsModule,
    BookingsModule,
    CampsitesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig],
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    UsersModule,
    AuthModule,
    SessionModule,
    OrganizationsModule,
    MembershipsModule,
    CommonModule,
  ],
})
export class AppModule {}

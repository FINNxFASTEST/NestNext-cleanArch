import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { SessionModule } from '../session/session.module';
import { UsersModule } from '../users/users.module';
import { LoginCommand } from './application/commands/login.command';
import { RegisterCommand } from './application/commands/register.command';
import { GetMeQuery } from './application/queries/get-me.query';
import { UpdateMeCommand } from './application/commands/update-me.command';
import { RefreshTokenCommand } from './application/commands/refresh-token.command';
import { LogoutCommand } from './application/commands/logout.command';
import { SoftDeleteUserCommand } from './application/commands/soft-delete-user.command';

@Module({
  imports: [UsersModule, SessionModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    JwtRefreshStrategy,
    AnonymousStrategy,
    LoginCommand,
    RegisterCommand,
    GetMeQuery,
    UpdateMeCommand,
    RefreshTokenCommand,
    LogoutCommand,
    SoftDeleteUserCommand,
  ],
})
export class AuthModule {}

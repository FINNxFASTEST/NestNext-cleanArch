import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthUpdateDto } from './dto/auth-update.dto';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { NullableType } from '../utils/types/nullable.type';
import { User } from '../users/domain/user';
import { LoginCommand } from './application/commands/login.command';
import { RegisterCommand } from './application/commands/register.command';
import { GetMeQuery } from './application/queries/get-me.query';
import { UpdateMeCommand } from './application/commands/update-me.command';
import { RefreshTokenCommand } from './application/commands/refresh-token.command';
import { LogoutCommand } from './application/commands/logout.command';
import { SoftDeleteUserCommand } from './application/commands/soft-delete-user.command';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly login: LoginCommand,
    private readonly register: RegisterCommand,
    private readonly getMe: GetMeQuery,
    private readonly updateMe: UpdateMeCommand,
    private readonly refreshToken: RefreshTokenCommand,
    private readonly logout: LogoutCommand,
    private readonly softDeleteUser: SoftDeleteUserCommand,
  ) {}

  @SerializeOptions({ groups: ['me'] })
  @Post('email/login')
  @ApiOkResponse({ type: LoginResponseDto })
  @HttpCode(HttpStatus.OK)
  public doLogin(
    @Body() loginDto: AuthEmailLoginDto,
  ): Promise<LoginResponseDto> {
    return this.login.execute(loginDto);
  }

  @SerializeOptions({ groups: ['me'] })
  @Post('email/register')
  @ApiOkResponse({ type: LoginResponseDto })
  @HttpCode(HttpStatus.OK)
  async doRegister(
    @Body() createUserDto: AuthRegisterLoginDto,
  ): Promise<LoginResponseDto> {
    return this.register.execute(createUserDto);
  }

  @ApiBearerAuth()
  @SerializeOptions({ groups: ['me'] })
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: User })
  @HttpCode(HttpStatus.OK)
  public me(@Request() request): Promise<NullableType<User>> {
    return this.getMe.execute(request.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: RefreshResponseDto })
  @SerializeOptions({ groups: ['me'] })
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public doRefresh(
    @Request() request,
  ): Promise<Omit<RefreshResponseDto, 'user'>> {
    return this.refreshToken.execute({
      sessionId: request.user.sessionId,
      hash: request.user.hash,
    });
  }

  @ApiBearerAuth()
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async doLogout(@Request() request): Promise<void> {
    await this.logout.execute({ sessionId: request.user.sessionId });
  }

  @ApiBearerAuth()
  @SerializeOptions({ groups: ['me'] })
  @Patch('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: User })
  public update(
    @Request() request,
    @Body() userDto: AuthUpdateDto,
  ): Promise<NullableType<User>> {
    return this.updateMe.execute(request.user, userDto);
  }

  @ApiBearerAuth()
  @Delete('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Request() request): Promise<void> {
    return this.softDeleteUser.execute(request.user);
  }
}

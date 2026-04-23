import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { IAuthResponse } from './interfaces/auth-response.interface';
import type { IJwtPayload } from './interfaces/jwt-payload.interface';
import type { UserRole } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<IAuthResponse> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.create({ ...dto, password: hashed });
    return this.buildTokenResponse(
      String(user._id),
      user.email,
      user.role as UserRole,
    );
  }

  async login(dto: LoginDto): Promise<IAuthResponse> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.buildTokenResponse(
      String(user._id),
      user.email,
      user.role as UserRole,
    );
  }

  private buildTokenResponse(
    userId: string,
    email: string,
    role: UserRole,
  ): IAuthResponse {
    const payload: IJwtPayload = { sub: userId, email, role };
    const token = this.jwtService.sign(payload);
    return { accessToken: token, tokenType: 'Bearer' };
  }
}

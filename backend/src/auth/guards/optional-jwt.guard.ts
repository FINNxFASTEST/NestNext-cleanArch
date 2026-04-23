import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { IAuthUser } from '../interfaces/auth-user.interface';

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = IAuthUser>(
    _err: Error | null,
    user: TUser | false,
  ): TUser | null {
    return user ? user : null;
  }
}

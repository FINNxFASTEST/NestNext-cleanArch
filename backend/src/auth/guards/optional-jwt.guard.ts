import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Runs JWT validation when a token is present but does NOT reject unauthenticated requests.
// Use on routes that are public but become richer when the caller is logged in.
@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(_err: any, user: any) {
    // Unlike JwtAuthGuard, we swallow errors and return null instead of throwing
    return user ?? null;
  }
}

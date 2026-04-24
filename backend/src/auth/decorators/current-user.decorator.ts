import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { IAuthUser } from '../interfaces/auth-user.interface';
import type { OptionalRequestWithUser } from '../interfaces/request-with-user.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): IAuthUser | null => {
    const request = ctx.switchToHttp().getRequest<OptionalRequestWithUser>();
    return request.user ?? null;
  },
);

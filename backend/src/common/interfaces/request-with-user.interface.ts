import type { Request } from 'express';
import type { IAuthUser } from '../../auth/interfaces/auth-user.interface';

export interface RequestWithUser extends Request {
  user: IAuthUser;
}

export interface OptionalRequestWithUser extends Request {
  user?: IAuthUser;
}

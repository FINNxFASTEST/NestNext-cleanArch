import type { UserRole } from '../../users/interfaces/user.interface';

export interface IJwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

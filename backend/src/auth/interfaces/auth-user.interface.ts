import type { UserRole } from '../../users/domain/user';

export interface IAuthUser {
  userId: string;
  email: string;
  role: UserRole;
}

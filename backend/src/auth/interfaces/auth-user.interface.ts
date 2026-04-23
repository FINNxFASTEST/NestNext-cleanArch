import type { UserRole } from '../../users/interfaces/user.interface';

export interface IAuthUser {
  userId: string;
  email: string;
  role: UserRole;
}

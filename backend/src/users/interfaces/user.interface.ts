export type UserRole = 'guest' | 'merchant' | 'admin';

export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IPublicUser = Omit<IUser, 'password'>;

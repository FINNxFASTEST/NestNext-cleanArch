export type UserRole = 'guest' | 'merchant' | 'admin';

export class User {
  _id!: string;
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  role!: UserRole;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export type PublicUser = Omit<User, 'password'>;

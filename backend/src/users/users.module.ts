import { Module } from '@nestjs/common';
import { UsersPersistenceModule } from './infrastructure/users-persistence.module';
import { UsersController } from './presentation/users.controller';
import { CreateUserCommand } from './application/commands/create-user.command';
import { GetUsersQuery } from './application/queries/get-users.query';
import { GetUserByIdQuery } from './application/queries/get-user-by-id.query';
import { GetUsersByIdsQuery } from './application/queries/get-users-by-ids.query';
import { GetUserByEmailQuery } from './application/queries/get-user-by-email.query';
import { UpdateUserCommand } from './application/commands/update-user.command';
import { RemoveUserCommand } from './application/commands/remove-user.command';

@Module({
  imports: [UsersPersistenceModule],
  controllers: [UsersController],
  providers: [
    CreateUserCommand,
    GetUsersQuery,
    GetUserByIdQuery,
    GetUsersByIdsQuery,
    GetUserByEmailQuery,
    UpdateUserCommand,
    RemoveUserCommand,
  ],
  exports: [
    CreateUserCommand,
    GetUsersQuery,
    GetUserByIdQuery,
    GetUsersByIdsQuery,
    GetUserByEmailQuery,
    UpdateUserCommand,
    RemoveUserCommand,
    UsersPersistenceModule,
  ],
})
export class UsersModule {}

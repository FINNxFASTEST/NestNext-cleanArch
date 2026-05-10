import { Injectable } from '@nestjs/common';
import { User } from '../../../users/domain/user';
import { RemoveUserCommand } from '../../../users/application/commands/remove-user.command';

@Injectable()
export class SoftDeleteUserCommand {
  constructor(private readonly removeUser: RemoveUserCommand) {}

  execute(user: User): Promise<void> {
    return this.removeUser.execute(user.id);
  }
}

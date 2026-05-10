import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../ports/session.repository';
import { User } from '../../../users/domain/user';

@Injectable()
export class DeleteSessionsByUserIdCommand {
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute(conditions: { userId: User['id'] }): Promise<void> {
    return this.sessionRepository.deleteByUserId(conditions);
  }
}

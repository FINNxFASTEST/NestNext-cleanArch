import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../ports/session.repository';
import { RepositoryOptions } from '../../../utils/types/repository-options.type';
import { User } from '../../../users/domain/user';
import { Session } from '../../domain/session';

@Injectable()
export class DeleteSessionsByUserIdExcludingCommand {
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute(
    conditions: {
      userId: User['id'];
      excludeSessionId: Session['id'];
    },
    options?: RepositoryOptions,
  ): Promise<void> {
    return this.sessionRepository.deleteByUserIdWithExclude(conditions, options);
  }
}

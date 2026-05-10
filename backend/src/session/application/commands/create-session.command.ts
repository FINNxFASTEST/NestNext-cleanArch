import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../ports/session.repository';
import { RepositoryOptions } from '../../../utils/types/repository-options.type';
import { Session } from '../../domain/session';

@Injectable()
export class CreateSessionCommand {
    constructor(private readonly sessionRepository: SessionRepository) {}

    execute(
        data: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
        options?: RepositoryOptions,
    ): Promise<Session> {
        return this.sessionRepository.create(data, options);
    }
}

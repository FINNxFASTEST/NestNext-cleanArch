import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../ports/session.repository';
import { Session } from '../../domain/session';

@Injectable()
export class UpdateSessionCommand {
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute(
    id: Session['id'],
    payload: Partial<
      Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<Session | null> {
    return this.sessionRepository.update(id, payload);
  }
}

import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../ports/session.repository';
import { Session } from '../../domain/session';

@Injectable()
export class DeleteSessionByIdCommand {
  constructor(private readonly sessionRepository: SessionRepository) {}

  execute(id: Session['id']): Promise<void> {
    return this.sessionRepository.deleteById(id);
  }
}

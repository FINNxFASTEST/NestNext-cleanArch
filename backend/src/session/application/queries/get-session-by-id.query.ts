import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../ports/session.repository';
import { Session } from '../../domain/session';
import { NullableType } from '../../../utils/types/nullable.type';

@Injectable()
export class GetSessionByIdQuery {
    constructor(private readonly sessionRepository: SessionRepository) {}

    execute(id: Session['id']): Promise<NullableType<Session>> {
        return this.sessionRepository.findById(id);
    }
}

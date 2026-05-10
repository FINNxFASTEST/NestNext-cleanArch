import { User } from '../../../users/domain/user';
import { NullableType } from '../../../utils/types/nullable.type';
import { RepositoryOptions } from '../../../utils/types/repository-options.type';
import { Session } from '../../domain/session';

export abstract class SessionRepository {
    abstract findById(id: Session['id']): Promise<NullableType<Session>>;

    abstract create(
        data: Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
        options?: RepositoryOptions,
    ): Promise<Session>;

    abstract update(
        id: Session['id'],
        payload: Partial<Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>,
        options?: RepositoryOptions,
    ): Promise<Session | null>;

    abstract updateByHash(
        conditions: { id: Session['id']; hash: Session['hash'] },
        payload: Partial<Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>,
        options?: RepositoryOptions,
    ): Promise<Session | null>;

    abstract deleteById(id: Session['id'], options?: RepositoryOptions): Promise<void>;

    abstract deleteByUserId(
        conditions: { userId: User['id'] },
        options?: RepositoryOptions,
    ): Promise<void>;

    abstract deleteByUserIdWithExclude(
        conditions: {
            userId: User['id'];
            excludeSessionId: Session['id'];
        },
        options?: RepositoryOptions,
    ): Promise<void>;
}

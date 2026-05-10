import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../utils/types/nullable.type';
import { SessionRepository } from '../../application/ports/session.repository';
import { RepositoryOptions } from '../../../utils/types/repository-options.type';
import { Session } from '../../domain/session';
import { SessionSchemaClass } from './session.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SessionMapper } from './session.mapper';
import { User } from '../../../users/domain/user';
import { SessionCacheService } from '../cache/session-cache.service';

@Injectable()
export class SessionDocumentRepository implements SessionRepository {
    constructor(
        @InjectModel(SessionSchemaClass.name)
        private readonly sessionModel: Model<SessionSchemaClass>,
        private readonly sessionCache: SessionCacheService,
    ) {}

    async findById(id: Session['id']): Promise<NullableType<Session>> {
        const cachedSession = await this.sessionCache.get(id);
        if (cachedSession) {
            return cachedSession;
        }

        const sessionObject = await this.sessionModel.findById(id);
        if (!sessionObject) {
            return null;
        }

        const session = SessionMapper.toDomain(sessionObject);
        await this.sessionCache.set(session);
        return session;
    }

    async create(data: Session, options?: RepositoryOptions): Promise<Session> {
        const persistenceModel = SessionMapper.toPersistence(data);
        const createdSession = new this.sessionModel(persistenceModel);
        const sessionObject = await createdSession.save({ session: options?.session });
        const session = SessionMapper.toDomain(sessionObject);
        if (!options?.session) {
            await this.sessionCache.set(session);
        }
        return session;
    }

    async update(id: Session['id'], payload: Partial<Session>, options?: RepositoryOptions): Promise<Session | null> {
        const clonedPayload = { ...payload };
        delete clonedPayload.id;
        delete clonedPayload.createdAt;
        delete clonedPayload.updatedAt;
        delete clonedPayload.deletedAt;

        const filter = { _id: id.toString() };
        const session = await this.sessionModel.findOne(filter);

        if (!session) {
            return null;
        }

        const sessionObject = await this.sessionModel.findOneAndUpdate(
            filter,
            SessionMapper.toPersistence({
                ...SessionMapper.toDomain(session),
                ...clonedPayload,
            }),
            { new: true, session: options?.session },
        );

        if (!sessionObject) {
            return null;
        }

        const updatedSession = SessionMapper.toDomain(sessionObject);
        if (!options?.session) {
            await this.sessionCache.set(updatedSession);
        }
        return updatedSession;
    }

    async updateByHash(
        conditions: { id: Session['id']; hash: Session['hash'] },
        payload: Partial<Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>,
        options?: RepositoryOptions,
    ): Promise<Session | null> {
        const sessionObject = await this.sessionModel.findOneAndUpdate(
            { _id: conditions.id.toString(), hash: conditions.hash },
            { hash: payload.hash },
            { new: true, session: options?.session },
        );

        if (!sessionObject) {
            return null;
        }

        const updatedSession = SessionMapper.toDomain(sessionObject);
        if (!options?.session) {
            await this.sessionCache.set(updatedSession);
        }
        return updatedSession;
    }

    async deleteById(id: Session['id'], options?: RepositoryOptions): Promise<void> {
        const existing = options?.session ? null : await this.findById(id);
        await this.sessionModel.deleteOne({ _id: id.toString() }, { session: options?.session });
        if (!options?.session) {
            await this.sessionCache.deleteById(id, existing?.user?.id);
        }
    }

    async deleteByUserId(
        { userId }: { userId: User['id'] },
        options?: RepositoryOptions,
    ): Promise<void> {
        await this.sessionModel.deleteMany({ user: userId.toString() }, { session: options?.session });
        if (!options?.session) {
            await this.sessionCache.deleteByUserId(userId);
        }
    }

    async deleteByUserIdWithExclude(
        {
            userId,
            excludeSessionId,
        }: {
            userId: User['id'];
            excludeSessionId: Session['id'];
        },
        options?: RepositoryOptions,
    ): Promise<void> {
        await this.sessionModel.deleteMany(
            {
                user: userId.toString(),
                _id: { $not: { $eq: excludeSessionId.toString() } },
            },
            { session: options?.session },
        );
        if (!options?.session) {
            await this.sessionCache.deleteByUserIdWithExclude(userId, excludeSessionId);
        }
    }
}

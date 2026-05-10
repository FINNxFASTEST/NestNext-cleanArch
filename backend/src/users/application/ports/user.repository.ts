import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RepositoryOptions } from '../../../utils/types/repository-options.type';
import { User } from '../../domain/user';

import { FilterUserDto, SortUserDto } from '../../presentation/dto/query-user.dto';

export abstract class UserRepository {
    abstract create(
        data: Omit<User, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>,
        options?: RepositoryOptions,
    ): Promise<User>;

    abstract findManyWithPagination({
        filterOptions,
        sortOptions,
        paginationOptions,
    }: {
        filterOptions?: FilterUserDto | null;
        sortOptions?: SortUserDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<User[]>;

    abstract findById(id: User['id']): Promise<NullableType<User>>;
    abstract findByIds(ids: User['id'][]): Promise<User[]>;
    abstract findByEmail(email: User['email']): Promise<NullableType<User>>;

    abstract update(
        id: User['id'],
        payload: DeepPartial<User>,
        options?: RepositoryOptions,
    ): Promise<User | null>;

    abstract remove(id: User['id'], options?: RepositoryOptions): Promise<void>;
}

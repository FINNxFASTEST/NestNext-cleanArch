import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Membership } from '../../domain/membership';

export abstract class MembershipRepository {
  abstract create(
    data: Omit<Membership, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Membership>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Membership[]>;

  abstract findById(id: Membership['id']): Promise<NullableType<Membership>>;

  abstract findByIds(ids: Membership['id'][]): Promise<Membership[]>;

  abstract findByUserAndOrganization(
    userId: string,
    organizationId: string,
  ): Promise<NullableType<Membership>>;

  abstract findByUserId(userId: string): Promise<Membership[]>;

  abstract findByOrganizationId(organizationId: string): Promise<Membership[]>;

  abstract update(
    id: Membership['id'],
    payload: DeepPartial<Membership>,
  ): Promise<Membership | null>;

  abstract remove(id: Membership['id']): Promise<void>;
}

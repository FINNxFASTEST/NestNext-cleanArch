import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Organization } from '../../domain/organization';

export abstract class OrganizationRepository {
  abstract create(
    data: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Organization>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Organization[]>;

  abstract findById(
    id: Organization['id'],
  ): Promise<NullableType<Organization>>;

  abstract findByIds(ids: Organization['id'][]): Promise<Organization[]>;

  abstract findBySlug(slug: string): Promise<NullableType<Organization>>;

  abstract findByOwnerId(ownerId: string): Promise<Organization[]>;

  abstract update(
    id: Organization['id'],
    payload: DeepPartial<Organization>,
  ): Promise<Organization | null>;

  abstract remove(id: Organization['id']): Promise<void>;
}

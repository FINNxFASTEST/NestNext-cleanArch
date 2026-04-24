import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Campsite } from '../../domain/campsite';

export abstract class CampsiteRepository {
  abstract create(
    data: Omit<Campsite, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Campsite>;

  abstract findAllWithPagination({
    paginationOptions,
    filter,
  }: {
    paginationOptions: IPaginationOptions;
    filter?: { organizationId?: string; status?: 'active' | 'inactive' };
  }): Promise<Campsite[]>;

  abstract findById(id: Campsite['id']): Promise<NullableType<Campsite>>;

  abstract findByIds(ids: Campsite['id'][]): Promise<Campsite[]>;

  abstract findByOrganizationId(organizationId: string): Promise<Campsite[]>;

  abstract update(
    id: Campsite['id'],
    payload: DeepPartial<Campsite>,
  ): Promise<Campsite | null>;

  abstract remove(id: Campsite['id']): Promise<void>;
}

import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Amenity } from '../../domain/amenity';

export abstract class AmenityRepository {
  abstract create(data: Omit<Amenity, 'id' | 'createdAt'>): Promise<Amenity>;

  abstract findAllWithPagination(opts: {
    paginationOptions: IPaginationOptions;
    search?: string;
  }): Promise<Amenity[]>;

  abstract findById(id: string): Promise<NullableType<Amenity>>;
}

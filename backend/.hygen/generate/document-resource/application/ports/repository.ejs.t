---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/application/ports/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository.ts
---
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { RepositoryOptions } from '../../../utils/types/repository-options.type';
import { <%= name %> } from '../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';

export abstract class <%= name %>Repository {
  abstract create(
    data: Omit<<%= name %>, 'id' | 'createdAt' | 'updatedAt'>,
    options?: RepositoryOptions,
  ): Promise<<%= name %>>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<<%= name %>[]>;

  abstract findById(id: <%= name %>['id']): Promise<NullableType<<%= name %>>>;

  abstract findByIds(ids: <%= name %>['id'][]): Promise<<%= name %>[]>;

  abstract update(
    id: <%= name %>['id'],
    payload: DeepPartial<<%= name %>>,
    options?: RepositoryOptions,
  ): Promise<<%= name %> | null>;

  abstract remove(id: <%= name %>['id'], options?: RepositoryOptions): Promise<void>;
}

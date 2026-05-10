---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/application/queries/get-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.query.ts
---
import { Injectable } from '@nestjs/common';
import { <%= name %>Repository } from '../ports/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import { <%= name %> } from '../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class Get<%= h.inflection.transform(name, ['pluralize']) %>Query {
  constructor(private readonly <%= h.inflection.camelize(name, true) %>Repository: <%= name %>Repository) {}

  execute(paginationOptions: IPaginationOptions): Promise<<%= name %>[]> {
    return this.<%= h.inflection.camelize(name, true) %>Repository.findAllWithPagination({
      paginationOptions,
    });
  }
}

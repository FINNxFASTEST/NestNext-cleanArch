---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/application/queries/get-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>-by-id.query.ts
---
import { Injectable } from '@nestjs/common';
import { <%= name %>Repository } from '../ports/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import { <%= name %> } from '../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
import { NullableType } from '../../../utils/types/nullable.type';

@Injectable()
export class Get<%= name %>ByIdQuery {
  constructor(private readonly <%= h.inflection.camelize(name, true) %>Repository: <%= name %>Repository) {}

  execute(id: <%= name %>['id']): Promise<NullableType<<%= name %>>> {
    return this.<%= h.inflection.camelize(name, true) %>Repository.findById(id);
  }
}

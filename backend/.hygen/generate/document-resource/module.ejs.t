---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.module.ts
---
import { Module } from '@nestjs/common';
import { <%= h.inflection.transform(name, ['pluralize']) %>PersistenceModule } from './infrastructure/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-persistence.module';
import { <%= h.inflection.transform(name, ['pluralize']) %>Controller } from './presentation/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.controller';
import { Create<%= name %>Command } from './application/commands/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.command';
import { Get<%= h.inflection.transform(name, ['pluralize']) %>Query } from './application/queries/get-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.query';
import { Get<%= name %>ByIdQuery } from './application/queries/get-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>-by-id.query';
import { Update<%= name %>Command } from './application/commands/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.command';
import { Remove<%= name %>Command } from './application/commands/remove-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.command';

@Module({
  imports: [
    // do not remove this comment
    <%= h.inflection.transform(name, ['pluralize']) %>PersistenceModule,
  ],
  controllers: [<%= h.inflection.transform(name, ['pluralize']) %>Controller],
  providers: [
    Create<%= name %>Command,
    Get<%= h.inflection.transform(name, ['pluralize']) %>Query,
    Get<%= name %>ByIdQuery,
    Update<%= name %>Command,
    Remove<%= name %>Command,
  ],
  exports: [
    Get<%= name %>ByIdQuery,
    <%= h.inflection.transform(name, ['pluralize']) %>PersistenceModule,
  ],
})
export class <%= h.inflection.transform(name, ['pluralize']) %>Module {}

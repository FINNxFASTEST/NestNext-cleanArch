import { Module } from '@nestjs/common';
import { SessionPersistenceModule } from './infrastructure/session-persistence.module';
import { CreateSessionCommand } from './application/commands/create-session.command';
import { GetSessionByIdQuery } from './application/queries/get-session-by-id.query';
import { UpdateSessionCommand } from './application/commands/update-session.command';
import { UpdateSessionByHashCommand } from './application/commands/update-session-by-hash.command';
import { DeleteSessionByIdCommand } from './application/commands/delete-session-by-id.command';
import { DeleteSessionsByUserIdCommand } from './application/commands/delete-sessions-by-user-id.command';
import { DeleteSessionsByUserIdExcludingCommand } from './application/commands/delete-sessions-by-user-id-excluding.command';

@Module({
  imports: [SessionPersistenceModule],
  providers: [
    CreateSessionCommand,
    GetSessionByIdQuery,
    UpdateSessionCommand,
    UpdateSessionByHashCommand,
    DeleteSessionByIdCommand,
    DeleteSessionsByUserIdCommand,
    DeleteSessionsByUserIdExcludingCommand,
  ],
  exports: [
    CreateSessionCommand,
    GetSessionByIdQuery,
    UpdateSessionCommand,
    UpdateSessionByHashCommand,
    DeleteSessionByIdCommand,
    DeleteSessionsByUserIdCommand,
    DeleteSessionsByUserIdExcludingCommand,
    SessionPersistenceModule,
  ],
})
export class SessionModule {}

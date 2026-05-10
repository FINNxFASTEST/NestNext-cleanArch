import { Injectable } from '@nestjs/common';
import { JwtRefreshPayloadType } from '../../strategies/types/jwt-refresh-payload.type';
import { DeleteSessionByIdCommand } from '../../../session/application/commands/delete-session-by-id.command';

@Injectable()
export class LogoutCommand {
  constructor(private readonly deleteSessionById: DeleteSessionByIdCommand) {}

  execute(data: Pick<JwtRefreshPayloadType, 'sessionId'>): Promise<void> {
    return this.deleteSessionById.execute(data.sessionId);
  }
}

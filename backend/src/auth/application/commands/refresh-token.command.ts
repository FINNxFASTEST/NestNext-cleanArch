import { Injectable, UnauthorizedException } from '@nestjs/common';
import crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../../config/config.type';
import { JwtRefreshPayloadType } from '../../strategies/types/jwt-refresh-payload.type';
import { RefreshResponseDto } from '../../dto/refresh-response.dto';
import { GetUserByIdQuery } from '../../../users/application/queries/get-user-by-id.query';
import { UpdateSessionByHashCommand } from '../../../session/application/commands/update-session-by-hash.command';
import { generateTokens } from '../helpers/generate-tokens.helper';

@Injectable()
export class RefreshTokenCommand {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<AllConfigType>,
        private readonly findUserById: GetUserByIdQuery,
        private readonly updateSessionByHash: UpdateSessionByHashCommand,
    ) {}

    async execute(
        data: Pick<JwtRefreshPayloadType, 'sessionId' | 'hash'>,
    ): Promise<Omit<RefreshResponseDto, 'user'>> {
        const hash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex');

        const session = await this.updateSessionByHash.execute(
            { id: data.sessionId, hash: data.hash },
            { hash },
        );

        if (!session) {
            throw new UnauthorizedException();
        }

        const user = await this.findUserById.execute(session.user.id);
        if (!user?.role) {
            throw new UnauthorizedException();
        }

        const { token, refreshToken, tokenExpires } = await generateTokens(
            this.jwtService,
            this.configService,
            {
                id: session.user.id,
                role: { id: user.role.id },
                sessionId: session.id,
                hash,
            },
        );

        return { token, refreshToken, tokenExpires };
    }
}

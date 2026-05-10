import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AllConfigType } from '../../../config/config.type';
import { AuthRegisterLoginDto } from '../../dto/auth-register-login.dto';
import { LoginResponseDto } from '../../dto/login-response.dto';
import { RoleEnum } from '../../../roles/roles.enum';
import { StatusEnum } from '../../../statuses/statuses.enum';
import { CreateUserCommand } from '../../../users/application/commands/create-user.command';
import { CreateSessionCommand } from '../../../session/application/commands/create-session.command';
import { generateTokens } from '../helpers/generate-tokens.helper';
import { withTransaction } from '../../../utils/transaction.helper';

@Injectable()
export class RegisterCommand {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<AllConfigType>,
        private readonly createUser: CreateUserCommand,
        private readonly createSession: CreateSessionCommand,
    ) {}

    async execute(dto: AuthRegisterLoginDto): Promise<LoginResponseDto> {
        const hash = crypto.createHash('sha256').update(randomStringGenerator()).digest('hex');

        const { user, session } = await withTransaction(this.connection, async (mongoSession) => {
            const user = await this.createUser.execute(
                {
                    ...dto,
                    email: dto.email,
                    role: { id: RoleEnum.customer },
                    status: { id: StatusEnum.active },
                },
                { session: mongoSession },
            );
            const session = await this.createSession.execute(
                { user, hash },
                { session: mongoSession },
            );
            return { user, session };
        });

        const { token, refreshToken, tokenExpires } = await generateTokens(
            this.jwtService,
            this.configService,
            { id: user.id, role: user.role, sessionId: session.id, hash },
        );

        return { refreshToken, token, tokenExpires, user };
    }
}

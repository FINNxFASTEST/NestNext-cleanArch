import { HttpStatus, Injectable, UnprocessableEntityException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { NullableType } from '../../../utils/types/nullable.type';
import { User } from '../../../users/domain/user';
import { AuthUpdateDto } from '../../dto/auth-update.dto';
import { JwtPayloadType } from '../../strategies/types/jwt-payload.type';
import { GetUserByIdQuery } from '../../../users/application/queries/get-user-by-id.query';
import { GetUserByEmailQuery } from '../../../users/application/queries/get-user-by-email.query';
import { UpdateUserCommand } from '../../../users/application/commands/update-user.command';
import { DeleteSessionsByUserIdExcludingCommand } from '../../../session/application/commands/delete-sessions-by-user-id-excluding.command';
import { withTransaction } from '../../../utils/transaction.helper';

@Injectable()
export class UpdateMeCommand {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        private readonly findUserById: GetUserByIdQuery,
        private readonly findUserByEmail: GetUserByEmailQuery,
        private readonly updateUser: UpdateUserCommand,
        private readonly deleteSessionsByUserIdExcluding: DeleteSessionsByUserIdExcludingCommand,
    ) {}

    async execute(
        userJwtPayload: JwtPayloadType,
        userDto: AuthUpdateDto,
    ): Promise<NullableType<User>> {
        const currentUser = await this.findUserById.execute(userJwtPayload.id);

        if (!currentUser) {
            throw new UnprocessableEntityException({
                status: HttpStatus.UNPROCESSABLE_ENTITY,
                errors: { user: 'userNotFound' },
            });
        }

        if (userDto.password) {
            if (!userDto.oldPassword) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: { oldPassword: 'missingOldPassword' },
                });
            }

            if (!currentUser.password) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: { oldPassword: 'incorrectOldPassword' },
                });
            }

            const isValidOldPassword = await bcrypt.compare(
                userDto.oldPassword,
                currentUser.password,
            );

            if (!isValidOldPassword) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: { oldPassword: 'incorrectOldPassword' },
                });
            }
        }

        if (userDto.email && userDto.email !== currentUser.email) {
            const userByEmail = await this.findUserByEmail.execute(userDto.email);
            if (userByEmail && userByEmail.id !== currentUser.id) {
                throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: { email: 'emailExists' },
                });
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { oldPassword: _removed, ...updatePayload } = userDto;

        if (userDto.password) {
            await withTransaction(this.connection, async (mongoSession) => {
                await this.deleteSessionsByUserIdExcluding.execute(
                    {
                        userId: currentUser.id,
                        excludeSessionId: userJwtPayload.sessionId,
                    },
                    { session: mongoSession },
                );
                await this.updateUser.execute(userJwtPayload.id, updatePayload, {
                    session: mongoSession,
                });
            });
        } else {
            await this.updateUser.execute(userJwtPayload.id, updatePayload);
        }

        return this.findUserById.execute(userJwtPayload.id);
    }
}

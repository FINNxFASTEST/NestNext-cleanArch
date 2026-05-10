import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../utils/types/nullable.type';
import { User } from '../../../users/domain/user';
import { JwtPayloadType } from '../../strategies/types/jwt-payload.type';
import { GetUserByIdQuery } from '../../../users/application/queries/get-user-by-id.query';

@Injectable()
export class GetMeQuery {
    constructor(private readonly findUserById: GetUserByIdQuery) {}

    execute(userJwtPayload: JwtPayloadType): Promise<NullableType<User>> {
        return this.findUserById.execute(userJwtPayload.id);
    }
}

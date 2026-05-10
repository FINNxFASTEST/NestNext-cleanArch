import { Injectable } from '@nestjs/common';
import { UserRepository } from '../ports/user.repository';
import { User } from '../../domain/user';
import { NullableType } from '../../../utils/types/nullable.type';

@Injectable()
export class GetUserByIdQuery {
    constructor(private readonly usersRepository: UserRepository) {}

    execute(id: User['id']): Promise<NullableType<User>> {
        return this.usersRepository.findById(id);
    }
}

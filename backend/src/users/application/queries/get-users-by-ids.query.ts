import { Injectable } from '@nestjs/common';
import { UserRepository } from '../ports/user.repository';
import { User } from '../../domain/user';

@Injectable()
export class GetUsersByIdsQuery {
    constructor(private readonly usersRepository: UserRepository) {}

    execute(ids: User['id'][]): Promise<User[]> {
        return this.usersRepository.findByIds(ids);
    }
}

import { UserDto } from './../model/User';
import UserRepository from "../repository/UserRepository";
import NotFoundError from '../../../domain/errors/NotFoundError';

export default class GetUserProfile {
    constructor(private repository: UserRepository) {}

    async exec(twitterHandle: string): Promise<UserDto> {
        const user: UserDto | null = await this.repository.getUserFromDb(twitterHandle);

        if (!user) {
            throw new NotFoundError();
        }

        return user;
    }
}

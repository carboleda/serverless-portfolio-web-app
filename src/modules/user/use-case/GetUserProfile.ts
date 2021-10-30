import { Inject } from "typescript-ioc";
import { UserDto } from './../model/User';
import UserRepository from "../repository/UserRepository";
import NotFoundError from '../../../domain/errors/NotFoundError';

export default class GetUserProfile {
    constructor(@Inject private repository: UserRepository) { }

    async exec(twitterHandle: string): Promise<UserDto> {
        let user: UserDto | null = await this.repository.getUserFromDb(twitterHandle);

        if (!user) {
            user = await this.repository.getUserFromApi(twitterHandle);
            await this.repository.saveUserToDb(user);
        }

        if (!user) {
            throw new NotFoundError();
        }

        return user;
    }
}

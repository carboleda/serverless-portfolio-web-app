import { Inject } from "typescript-ioc";
import { UserDto } from "../model/User";
import UserRepository from "../repository/UserRepository";

export default class UpdateUserProfile {
    constructor(@Inject private repository: UserRepository) {}

    async exec(user: UserDto): Promise<boolean> {
        await this.repository.saveUserToDb(user);

        return true;
    }
}
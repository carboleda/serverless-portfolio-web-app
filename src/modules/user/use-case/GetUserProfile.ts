import { TweetDto } from './../../tweet/model/Tweet';
import { Inject } from "typescript-ioc";
import { UserDto, UserProfileDto } from './../model/User';
import UserRepository from "../repository/UserRepository";
import NotFoundError from '../../../domain/errors/NotFoundError';
import GetTweetsByUser from "../../tweet/use-case/GetTweetsByUser";

export default class GetUserProfile {
    constructor(
        @Inject private repository: UserRepository,
        @Inject private getTweets: GetTweetsByUser,
    ) { }

    async exec(twitterHandle: string): Promise<UserProfileDto> {
        let user: UserDto | null = await this.repository.getUserFromDb(twitterHandle);

        if (!user) {
            user = await this.repository.getUserFromApi(twitterHandle);
            await this.repository.saveUserToDb(user);
        }

        if (!user) {
            throw new NotFoundError();
        }

        const tweets: TweetDto[] = await this.getTweets.exec(twitterHandle);

        return { user, tweets };
    }
}

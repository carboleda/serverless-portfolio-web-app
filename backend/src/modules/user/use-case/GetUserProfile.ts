import { TweetDto } from './../../tweet/model/Tweet';
import { Inject } from "typescript-ioc";
import { UserDto, UserProfileDto } from './../model/User';
import UserRepository from "../repository/UserRepository";
import NotFoundError from '../../../domain/errors/NotFoundError';
import GetTweetsByUser from "../../tweet/use-case/GetTweetsByUser";
import LoadEnv from '../../../helpers/LoadEnv';

export default class GetUserProfile {
    constructor(
        @Inject private repository: UserRepository,
        @Inject private getTweets: GetTweetsByUser,
    ) { }

    async exec(twitterHandle: string): Promise<UserProfileDto> {
        let user: UserDto | null = await this.repository.getUserFromDb(twitterHandle);
        let forceTweetsUpdate = false;

        if (!user) {
            user = await this.repository.getUserFromApi(twitterHandle);
            await this.repository.createUserOnDb(user);
        }

        if (!user) {
            throw new NotFoundError();
        }

        if (Date.now() - user.timelineUpdatedAt!! > LoadEnv.TTL_TWEETS) {
            forceTweetsUpdate = true;
            user.timelineUpdatedAt = Date.now();
        }

        const tweets: TweetDto[] = await this.getTweets.exec(twitterHandle, forceTweetsUpdate);

        if (forceTweetsUpdate) {
            await this.repository.saveTimelineUpdatedAtOnDb(twitterHandle, user.timelineUpdatedAt!!);
        }

        return { user, tweets };
    }
}

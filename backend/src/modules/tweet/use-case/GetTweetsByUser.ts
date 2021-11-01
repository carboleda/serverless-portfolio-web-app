import { Inject } from "typescript-ioc";
import { TweetDto } from './../model/Tweet';
import UserRepository from "../repository/TweetRepository";
import NotFoundError from '../../../domain/errors/NotFoundError';

export default class GetTweetsByUser {
    constructor(@Inject private repository: UserRepository) { }

    async exec(twitterHandle: string, forceTweetsUpdate: boolean): Promise<TweetDto[]> {
        let tweets: TweetDto[] = [];

        if (!forceTweetsUpdate) {
            tweets = await this.repository.getTweetsByUserFromDb(twitterHandle);
        }

        if (tweets.length === 0) {
            tweets = await this.repository.getLastTweetsByUserFromApi(twitterHandle);
            await this.repository.saveTweetsToDb(tweets);
        }

        return tweets;
    }
}

import { Inject } from "typescript-ioc";
import { TweetDto, TweetModel, TweetTwitterModel } from './../model/Tweet';
import { Methods } from "../../../datasource/rest-api/Client";
import Api from "../../../datasource/rest-api/Api";
import LoadEnv from "../../../helpers/LoadEnv";
import { DynamoDBClient, BatchWriteItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import TweetMapper from "../model/TweetMapper";

export default class TweetRepository {
    private static URL: string = `${LoadEnv.TWITTER_ENDPOINT}/1.1/statuses/user_timeline.json?screen_name={screen_name}&count={count}`;
    @Inject
    private db!: DynamoDBClient;
    @Inject
    private api!: Api;

    async getLastTweetsByUserFromApi(twitterHandle: string): Promise<TweetDto[]> {
        try {
            const response: { data: TweetTwitterModel[] } = await this.api.request({
                url: TweetRepository.URL,
                method: Methods.GET,
                headers: {
                    Authorization: LoadEnv.TWITTER_BEARER_TOKEN
                }
            }, { screen_name: twitterHandle, count: LoadEnv.LIMIT_TWEETS });

            return response.data
                .map((tweet: TweetTwitterModel): TweetDto => TweetMapper.twitter2Dto(tweet));
        } catch (error) {
            throw error;
        }
    }

    async saveTweetsToDb(tweets: TweetDto[]): Promise<TweetDto[]> {
        try {
            if (tweets.length === 0) {
                return tweets;
            }

            const requests = tweets
                .map((tweet: TweetDto): any => {
                    return {
                        PutRequest: {
                            Item: TweetMapper.toModel(tweet)
                        }
                    }
                });
            const params = {
                RequestItems: {
                    [LoadEnv.TWEETS_TABLE]: requests
                }
            };

            await this.db.send(new BatchWriteItemCommand(params));
        } catch (error) {
            throw error;
        }

        return tweets;
    }

    async getTweetsByUserFromDb(twitterHandle: string): Promise<TweetDto[]> {
        let tweets: TweetDto[] = [];

        try {
            const params = {
                TableName: LoadEnv.TWEETS_TABLE,
                KeyConditionExpression: "TWITTER_HANDLE = :s",
                ExpressionAttributeValues: {
                    ":s": { S: twitterHandle },
                },
                ScanIndexForward: false,
                Limit: LoadEnv.LIMIT_TWEETS,
            };

            const { Items } = await this.db.send(new QueryCommand(params));

            if (Items) {
                tweets = (Items as Array<TweetModel>)
                    .map((tweet: TweetModel): TweetDto => TweetMapper.toDto(tweet));
            }
        } catch (error) {
            throw error;
        }

        return tweets;
    }
}

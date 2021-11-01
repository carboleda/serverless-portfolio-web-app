import { Inject } from "typescript-ioc";
import { UserDto } from './../model/User';
import { Methods } from "../../../datasource/rest-api/Client";
import Api from "../../../datasource/rest-api/Api";
import LoadEnv from "../../../helpers/LoadEnv";
import { DynamoDBClient, PutItemCommand, UpdateItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import UserMapper from "../model/UserMapper";

export default class UserRepository {
    private static URL: string = `${LoadEnv.TWITTER_ENDPOINT}/1.1/users/show.json?screen_name={screen_name}`;
    @Inject
    private db!: DynamoDBClient;
    @Inject
    private api!: Api;

    async getUserFromApi(twitterHandle: string): Promise<UserDto> {
        try {
            const response = await this.api.request({
                url: UserRepository.URL,
                method: Methods.GET,
                headers: {
                    Authorization: LoadEnv.TWITTER_BEARER_TOKEN
                }
            }, { screen_name: twitterHandle });

            return UserMapper.twitter2Dto(response.data);
        } catch (error) {
            throw error;
        }
    }

    async createUserOnDb(user: UserDto): Promise<UserDto> {
        try {
            await this.db
                .send(new PutItemCommand({
                    TableName: LoadEnv.USERS_TABLE,
                    Item: UserMapper.toModel(user)
                }));
        } catch (error) {
            throw error;
        }

        return user;
    }

    async updateUserOnDb(user: UserDto): Promise<UserDto> {
        try {
            await this.db
                .send(new UpdateItemCommand({
                    TableName: LoadEnv.USERS_TABLE,
                    Key: {
                        TWITTER_HANDLE: { S: user.twitterHandle!! },
                    },
                    ExpressionAttributeNames: {
                        "#NAME": 'NAME',
                        "#DESCRIPTION": 'DESCRIPTION',
                    },
                    ExpressionAttributeValues: {
                        ":n": { S: user.name!! },
                        ":d": { S: user.description!! },
                    },
                    UpdateExpression: "set #NAME = :n, #DESCRIPTION = :d",
                }));
        } catch (error) {
            throw error;
        }

        return user;
    }

    async saveTimelineUpdatedAtOnDb(twitterHandle: string, timelineUpdatedAt: number): Promise<void> {
        try {
            await this.db
                .send(new UpdateItemCommand({
                    TableName: LoadEnv.USERS_TABLE,
                    Key: {
                        TWITTER_HANDLE: { S: twitterHandle!! },
                    },
                    ExpressionAttributeNames: {
                        "#TIMELINE_UPDATED_AT": 'TIMELINE_UPDATED_AT',
                    },
                    ExpressionAttributeValues: {
                        ":t": { N: timelineUpdatedAt.toString() },
                    },
                    UpdateExpression: "set #TIMELINE_UPDATED_AT = :t",
                }));
        } catch (error) {
            throw error;
        }
    }

    async getUserFromDb(twitterHandle: string): Promise<UserDto | null> {
        let user: UserDto | null = null

        try {
            const { Item } = await this.db
                .send(new GetItemCommand({
                    TableName: LoadEnv.USERS_TABLE,
                    Key: {
                        TWITTER_HANDLE: { S: twitterHandle },
                    }
                }));
            if (Item) {
                user = UserMapper.toDto(Item);
            }
        } catch (error) {
            throw error;
        }

        return user;
    }
}

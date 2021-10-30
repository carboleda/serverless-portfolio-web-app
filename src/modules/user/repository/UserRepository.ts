import { Inject } from "typescript-ioc";
import { UserDto } from './../model/User';
import { Methods } from "../../../datasource/rest-api/Client";
import Api from "../../../datasource/rest-api/Api";
import LoadEnv from "../../../helpers/LoadEnv";
import { DynamoDBClient, PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import UserMapper from "../model/UserMapper";

export default class UserRepository {
    private static URL: string = `${LoadEnv.TWITTER_ENDPOINT}/1.1/users/show.json`;
    @Inject
    private db!: DynamoDBClient;
    @Inject
    private api!: Api;

    async getUserFromApi(
        accessToken: string, tokenType: string, twitterHandle: string
    ): Promise<any> {
        try {
            const response = await this.api.request({
                url: UserRepository.URL,
                method: Methods.GET,
                headers: {
                    Authorization: `${tokenType} ${accessToken}`
                }
            }, { screen_name: twitterHandle });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async saveUserToDb(user: UserDto): Promise<UserDto> {
        try {
            console.log('model', UserMapper.toModel(user));
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

    async getUserFromDb(handle: string): Promise<UserDto | null> {
        let user: UserDto | null = null

        try {
            const { Item } = await this.db
                .send(new GetItemCommand({
                    TableName: LoadEnv.USERS_TABLE,
                    Key: {
                        TWITTER_HANDLE: { S: handle },
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

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Singleton } from "typescript-ioc";
import LoadEnv from "../../helpers/LoadEnv";

@Singleton
export default class DynamoDBDataSource {
    private db?: DynamoDBClient;

    constructor() {
        const offlineOptions = {
            region: LoadEnv.DYNAMODB_LOCAL_REGION,
            endpoint: LoadEnv.DYNAMODB_LOCAL_ENDPOINT,
        };
        this.db = new DynamoDBClient(LoadEnv.IS_OFFLINE ? offlineOptions : {});
    }

    public getConnection(): DynamoDBClient {
        return this.db!!;
    }
}
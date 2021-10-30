import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Singleton } from "typescript-ioc";
import LoadEnv from "../../helpers/LoadEnv";

@Singleton
export default class DynamoDBDataSource {
    private db?: DynamoDBClient;

    constructor() {
        if (LoadEnv.IS_OFFLINE) {
            this.db = new DynamoDBClient({
                region: 'localhost',
                endpoint: 'http://localhost:8000',
            });
        } else {
            this.db = new DynamoDBClient({});
        }
    }

    public getConnection(): DynamoDBClient {
        return this.db!!;
    }
}
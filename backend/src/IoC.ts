import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Container, ObjectFactory } from "typescript-ioc";
import DynamoDbDataSource from "./datasource/database/DynamoDbDataSource";
import Api from "./datasource/rest-api/Api";
import AxiosRequestClient from "./datasource/rest-api/AxiosRequestClient";

const dynamoDbFactory: ObjectFactory = () => new DynamoDbDataSource().getConnection();
Container.bind(DynamoDBClient).factory(dynamoDbFactory);

const apiFactory: ObjectFactory = () => new Api(new AxiosRequestClient());
Container.bind(Api).factory(apiFactory);
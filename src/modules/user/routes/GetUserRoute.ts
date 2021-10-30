import * as Express from "express";
import Api from "../../../datasource/rest-api/Api";
import AbstractRoute from "../../../domain/AbstractRoute";
import UserRepository from "../repository/UserRepository";
import GetUserProfile from "../use-case/GetUserProfile";
import AxiosRequestClient from "../../../datasource/rest-api/AxiosRequestClient";
import { UserDto } from "../model/User";
import dynamoDbDataSource from "../../../datasource/database/DynamoDbDataSource";

export default class GetUserRoute extends AbstractRoute {
    constructor(server: Express.Application) {
        super('user', server);
    }

    register(): Express.Router {
        const router = Express.Router();

        const db = dynamoDbDataSource.getConnection();
        const api = new Api(new AxiosRequestClient());
        const useCase = new GetUserProfile(new UserRepository(db, api));

        router.get('/:handle', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            const { handle } = req.params;
            useCase.exec(handle).then((user: UserDto) => {
                res.send({ success: true, user });
            }).catch(next);
        });

        return router;
    }
}

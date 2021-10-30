import { UserDto } from './../model/User';
import * as Express from "express";
import Api from "../../../datasource/rest-api/Api";
import AbstractRoute from "../../../domain/AbstractRoute";
import UserRepository from "../repository/UserRepository";
import AxiosRequestClient from "../../../datasource/rest-api/AxiosRequestClient";
import UpdateUserProfile from "../use-case/UpdateUserProfile";
import dynamoDbDataSource from "../../../datasource/database/DynamoDbDataSource";

export default class UpdateUserRoute extends AbstractRoute {
    constructor(server: Express.Application) {
        super('user', server);
    }

    register(): Express.Router {
        const router = Express.Router();

        const db = dynamoDbDataSource.getConnection();
        const api = new Api(new AxiosRequestClient());
        const useCase = new UpdateUserProfile(new UserRepository(db, api));

        router.post('/', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            const user: UserDto = req.body;

            useCase.exec(user).then((success: boolean) => {
                res.send({ success });
            }).catch(next);
        });

        return router;
    }
}

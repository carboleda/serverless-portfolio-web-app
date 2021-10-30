import { UserDto } from './../model/User';
import * as Express from "express";
import AbstractRoute from "../../../domain/AbstractRoute";
import UpdateUserProfile from "../use-case/UpdateUserProfile";
import { Inject } from 'typescript-ioc';

export default class UpdateUserRoute extends AbstractRoute {
    @Inject private useCase!: UpdateUserProfile;

    constructor(server: Express.Application) {
        super('user', server);
    }

    register(): Express.Router {
        const router = Express.Router();

        router.post('/', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            const user: UserDto = req.body;

            this.useCase.exec(user).then((success: boolean) => {
                res.send({ success });
            }).catch(next);
        });

        return router;
    }
}

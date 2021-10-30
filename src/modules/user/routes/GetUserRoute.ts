import * as Express from "express";
import AbstractRoute from "../../../domain/AbstractRoute";
import GetUserProfile from "../use-case/GetUserProfile";
import { UserDto } from "../model/User";
import { Inject } from "typescript-ioc";

export default class GetUserRoute extends AbstractRoute {
    @Inject
    private useCase!: GetUserProfile;

    constructor(server: Express.Application) {
        super('user', server);
    }

    register(): Express.Router {
        const router = Express.Router();

        router.get('/:handle', (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            const { handle } = req.params;
            this.useCase.exec(handle).then((user: UserDto) => {
                res.send({ success: true, user });
            }).catch(next);
        });

        return router;
    }
}
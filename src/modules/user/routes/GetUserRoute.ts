import * as Express from "express";
import AbstractRoute from "../../../domain/AbstractRoute";

export default class GetUserRoute extends AbstractRoute {
    constructor(server: Express.Application) {
        super('user', server);
    }

    register(): Express.Router {
        const router = Express.Router();
        router.get('/:handle', async (req: Express.Request, res: Express.Response) => {
            const { handle } = req.params;
            res.send({ handle });
        });

        return router;
    }
}

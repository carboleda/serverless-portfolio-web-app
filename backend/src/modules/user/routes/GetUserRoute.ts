import { UserProfileDto } from './../model/User';
import * as Express from "express";
import * as Joi from 'joi';
import AbstractRoute from "../../../domain/AbstractRoute";
import GetUserProfile from "../use-case/GetUserProfile";
import { Inject } from "typescript-ioc";

export default class GetUserRoute extends AbstractRoute {
    @Inject
    private useCase!: GetUserProfile;
    private schema: Joi.Schema = Joi.object({
        twitterHandle: Joi.string().min(4).max(15).required(),
    });

    constructor(server: Express.Application) {
        super('user', server);
    }

    register(): Express.Router {
        const router = Express.Router();

        router.get('/:twitterHandle', this.validations, this.handler);

        return router;
    }

    private handler = (req: Express.Request, res: Express.Response, next: Express.NextFunction): void => {
        const { twitterHandle } = req.params;

        this.useCase.exec(twitterHandle)
            .then((profile: UserProfileDto) => {
                res.send({ success: true, profile });
            })
            .catch(next);
    }

    private validations = (req: Express.Request, res: Express.Response, next: Express.NextFunction): void => {
        const { error, value } = this.schema.validate(req.params);
        if (error) {
            return next(error);
        }

        req.params = value;
        next();
    }
}

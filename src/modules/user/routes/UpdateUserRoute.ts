import { UserDto } from './../model/User';
import * as Express from "express";
import * as Joi from 'joi';
import Constants from '../../../helpers/Constants';
import AbstractRoute from "../../../domain/AbstractRoute";
import UpdateUserProfile from "../use-case/UpdateUserProfile";
import { Inject } from 'typescript-ioc';

export default class UpdateUserRoute extends AbstractRoute {
    @Inject private useCase!: UpdateUserProfile;
    private schema: Joi.Schema = Joi.object({
        twitterHandle: Joi.string().min(4).max(15).required(),
        name: Joi.string().min(3).max(50).regex(Constants.NAME_REGEX).required(),
        image: Joi.string().uri().required(),
        description: Joi.string().max(250).optional().default(''),
    });

    constructor(server: Express.Application) {
        super('user', server);
    }

    register(): Express.Router {
        const router = Express.Router();

        router.put('/', this.validations, this.handler);

        return router;
    }

    private handler = (req: Express.Request, res: Express.Response, next: Express.NextFunction): void => {
        const user: UserDto = req.body;

        this.useCase.exec(user)
            .then((success: boolean) => {
                res.send({ success });
            })
            .catch(next);
    }

    private validations = (req: Express.Request, res: Express.Response, next: Express.NextFunction): void => {
        const { error, value } = this.schema.validate(req.body);
        if (error) {
            return next(error);
        }

        req.body = value;
        next();
    }
}
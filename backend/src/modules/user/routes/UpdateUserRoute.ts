import { UserDto } from './../model/User';
import * as Express from "express";
import * as Joi from 'joi';
import Constants from '../../../helpers/Constants';
import AbstractRoute from "../../../domain/AbstractRoute";
import UpdateUserProfile from "../use-case/UpdateUserProfile";
import { Inject } from 'typescript-ioc';

export default class UpdateUserRoute extends AbstractRoute {
    @Inject private useCase!: UpdateUserProfile;
    private paramsSchema: Joi.Schema = Joi.object({
        twitterHandle: Joi.string().min(4).max(15).required(),
    });
    private bodySchema: Joi.Schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        image: Joi.string().uri().required(),
        description: Joi.string().max(250).required(),
    });

    constructor(server: Express.Application) {
        super('user', server);
    }

    register(): Express.Router {
        const router = Express.Router();

        router.put('/:twitterHandle', this.validations, this.handler);

        return router;
    }

    private handler = (req: Express.Request, res: Express.Response, next: Express.NextFunction): void => {
        const { twitterHandle } = req.params;
        const user: UserDto = req.body;

        this.useCase.exec({ ...user, twitterHandle })
            .then((success: boolean) => {
                res.send({ success });
            })
            .catch(next);
    }

    private validations = (req: Express.Request, res: Express.Response, next: Express.NextFunction): void => {
        const { error: paramsErrors, value: params } = this.paramsSchema.validate(req.params);
        if (paramsErrors) {
            return next(paramsErrors);
        }

        const { error: bodyErrors, value: body } = this.bodySchema.validate(req.body);
        if (bodyErrors) {
            return next(bodyErrors);
        }

        req.body = params;
        req.body = body;
        next();
    }
}
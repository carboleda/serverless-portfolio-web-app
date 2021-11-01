import LoadEnv from './helpers/LoadEnv';
import "./IoC";
import * as Express from 'express';
import * as Joi from 'joi';
import AbstractRoute from './domain/AbstractRoute';
import ApiError from './domain/errors/ApiError';
import GetUserRoute from './modules/user/routes/GetUserRoute';
import UpdateUserRoute from './modules/user/routes/UpdateUserRoute';

export default class Server {
    private runningMessage = `Server is listening on http://localhost:${LoadEnv.PORT}`;
    private server?: Express.Application;
    private routes: AbstractRoute[] = [];

    public init(): Express.Application {
        this.server = Express();

        this.server.use(Express.json());
        this.setRoutes();
        this.server.use(this.errorHandler);

        return this.server;
    }

    public getApp(): Express.Application {
        return this.server!!;
    }

    private setRoutes() {
        this.routes = [
            new GetUserRoute(this.server!!),
            new UpdateUserRoute(this.server!!),
        ];

        this.server!!.get('/', (req: Express.Request, res: Express.Response) => {
            res.status(200).send(this.runningMessage);
        });
        this.routes.forEach(router => this.server!!.use(router.getPrefix(), router.register()));
    }

    private errorHandler(
        error: unknown, req: Express.Request, res: Express.Response, next: Express.NextFunction
    ): Express.Response | void {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({
                success: false,
                message: 'Bad Request',
                cause: error.message,
            });
        }

        if (error instanceof ApiError) {
            console.warn(`Caught Validation Error for ${req.path}:`, error.code);
            return res.status(error.code).json({
                success: false,
                message: error.message,
                casue: error.cause?.message,
            });
        }

        if (error instanceof Error) {
            console.error(`"Internal Server Error" ${req.path}:`, error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                cause: error.message,
                name: error.name,
            });
        }
        next();
    }
}

import * as Express from 'express';
import { Environment } from './helpers/Constants';
import LoadEnv from './helpers/LoadEnv';
import Router from './Router';

export default class Server {
    private server?: Express.Application;

    public async start() {
        this.server = Express();

        const runningMessage = `Server is listening on http://localhost:${LoadEnv.PORT}`;

        await Router.loadRoutes(this.server);

        this.server.get('/', (req: Express.Request, res: Express.Response) => {
            res.status(200).send(runningMessage);
        });

        if (LoadEnv.NODE_ENV === Environment.DEV) {
            this.server.listen(LoadEnv.PORT, () => {
                console.log(runningMessage);
            });
        }
    }

    public getApp(): Express.Application {
        return this.server!!;
    }
}

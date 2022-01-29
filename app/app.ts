import * as dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import mongoSetup from './config/MongoConfig';
import ErrorHandlerMiddleware from './middlewares/ErrorHandlerMiddleware';
import Routes from './routes/Routes';

export default class App {

    constructor(
        private routes: Routes,
        private errorHandlerMiddleware: ErrorHandlerMiddleware,
    ) {
    }

    public startHttpServer = async (): Promise<void> => {
        await mongoSetup();

        const app = express();
        app.use(express.json());
        app.use('/api/spreadSheet', this.routes.getRouter());
        app.use(this.errorHandlerMiddleware.handleError);

        app.listen(process.env.LISTEN_PORT, () => {
            console.log('Express server listening on port ' + process.env.LISTEN_PORT);
            console.log('Version 1');
        });
    }

}

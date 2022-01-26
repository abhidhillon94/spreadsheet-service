import * as dotenv from 'dotenv';

dotenv.config();
import express from 'express';

export default class App {

    public startHttpServer = async (): Promise<void> => {
        const app = express();
        app.use(express.json());
        app.use('/api/spreadSheet/health', (req, res) => res.status(200).send({}));

        app.listen(process.env.LISTEN_PORT, () => {
            console.log('Express server listening on port ' + process.env.LISTEN_PORT);
            console.log('Version 1');
        });
    }

}

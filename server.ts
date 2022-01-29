// tslint:disable: no-console
import * as dotenv from 'dotenv';
dotenv.config();

import DIContainer from '@app/DIContainer';
DIContainer.app.startHttpServer();

process.on('unhandledRejection', (reason, p) => {
    console.log('high severity error: Unhandled Rejection');

    console.log({reason});
    console.log({promise: p});
}).on('uncaughtException', (err) => {
    console.log('high severity error: Uncaught Exception thrown', err.stack);
});

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown() {
    process.exit();
}

import * as winston from 'winston';

const options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

const Logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    exitOnError: false,
});
Logger.add(new winston.transports.Console(options.console));

export default Logger;

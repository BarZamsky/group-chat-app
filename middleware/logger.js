const winston = require('winston'),
    debug = require('debug'),
    info = debug('chat:info'),
    appRoot = require('app-root-path'),
    fs = require('fs');

fs.mkdir(`${appRoot}/logs`, (err) => { /* no-op */ })

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    errorFile: {
        level: 'error',
        name: 'file.error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 100,
        colorize: false,
    },
    console: {
        level: 'debug',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new (winston.transports.Console)(options.console),
        new (winston.transports.File)(options.errorFile),
        new (winston.transports.File)(options.file)
    ],
    exitOnError: false
});

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};

info('Social network logger start');

module.exports = logger;

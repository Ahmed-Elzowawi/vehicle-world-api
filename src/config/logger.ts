import { createLogger, format, transports } from 'winston';
const { combine, timestamp } = format;

export const developmentLogger = createLogger({
  level: 'debug',
  format: combine(format.colorize(), format.errors({ stack: true }), format.simple()),
  transports: [new transports.Console()],
});

export const productionLogger = createLogger({
  level: 'info',
  format: combine(timestamp(), format.errors({ stack: true }), format.json()),
  defaultMeta: { service: 'Vehicle World API server' },
  transports: [
    new transports.File({ filename: './info.log', level: 'info' }),
    new transports.File({ filename: './warn.log', level: 'warn' }),
    new transports.File({ filename: './error.log', level: 'error' }),
  ],
});

export const logger = process.env.NODE_ENV === 'development' ? developmentLogger : productionLogger;

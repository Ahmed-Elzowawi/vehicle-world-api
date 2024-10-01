import 'dotenv/config';
import { establishDbConnection, logger } from './config/index.js';
import { Server } from 'http';
import mongoose from 'mongoose';
import { app } from './app.js';

export const main = async () => {
  const port: number = parseInt(process.env.SERVER_PORT);
  const db: void | typeof mongoose = await establishDbConnection().catch((err) => {
    logger.error('Failed to connect to MongoDB Database');
    logger.error(err);
  });

  const server: Server = app.listen(port, () => {
    logger.info(`Running in ${process.env.NODE_ENV} environment`);
    if (db) logger.info('Connected to MongoDB Database!');
    logger.info(`Listening on port ${port}`);
  });

  process.on('SIGTERM', async () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    logger.info('Cleaning up resources before exiting...');
    logger.info('Closing mongoDB database connection...');

    let isError = false;
    if (db)
      await db.disconnect().catch((err) => {
        isError = true;
        logger.error(err);
      });
    if (isError) logger.error('Failed to close mongoDB database connection');
    else logger.info('MongoDB database connection closed successfully');

    server.close(() => logger.info('HTTP server closed'));
    logger.info('Resources cleaned up successfully');
    logger.info('Closing HTTP server...');
  });
};

main();

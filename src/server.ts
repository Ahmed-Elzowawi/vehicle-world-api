import 'dotenv/config';
import { establishDbConnection } from 'config/index';
import { logger } from 'config/index';
import mongoose from 'mongoose';
import { app } from './app';

export const main = async () => {
  const port: number = parseInt(process.env.SERVER_PORT);
  const db: void | typeof mongoose = await establishDbConnection().catch((err) => {
    logger.error('Failed to connect to MongoDB Database');
    logger.error(err);
  });

  app.listen(port, () => {
    logger.info(`Running in ${process.env.NODE_ENV} environment`);
    if (db) logger.info('Connected to MongoDB Database!');
    logger.info(`Listening on port ${port}`);
  });

};

main();

import mongoose from 'mongoose';
import { logger } from './logger';

const userName = process.env.DATABASE_USER;
const password = encodeURIComponent(process.env.DATABASE_PASSWORD);
const hostName = process.env.DATABASE_HOST_NAME;
const databasePort = process.env.DATABASE_PORT;
const databaseName = process.env.DATABASE_NAME;

export const establishDbConnection = async (): Promise<void | typeof mongoose> => {
  const db = await mongoose
    .connect(
      `mongodb://${userName}:${password}@${hostName}:${databasePort}/${databaseName}?authSource=admin`,
    )
    .catch((err) => {
      logger.error(err);
    });

  return db;
};

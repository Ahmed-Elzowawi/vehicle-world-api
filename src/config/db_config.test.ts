import { establishDbConnection } from './db_config';
import mongoose from 'mongoose';
import { logger } from './logger';

jest.mock('mongoose');
jest.mock('./logger');

// @ts-expect-error Even though we used jest.mocked('mongoose'), typescript still won't be able to tell that mongoose module is mocked
mongoose.connect.mockResolvedValue(mongoose);

const userName = process.env.DATABASE_USER;
const password = encodeURIComponent(process.env.DATABASE_PASSWORD);
const hostName = process.env.DATABASE_HOST_NAME;
const databasePort = process.env.DATABASE_PORT;
const databaseName = process.env.DATABASE_NAME;

it('should connect to mongodb database', async () => {
  const db: typeof mongoose | void = await establishDbConnection();
  expect(mongoose.connect).toHaveBeenCalled();
  expect(mongoose.connect).toHaveBeenCalledWith(
    `mongodb://${userName}:${password}@${hostName}:${databasePort}/${databaseName}?authSource=admin`,
  );
  expect(db).toBe(mongoose);
});

const errorMessage = 'Failed to connect to mongodb database';
// @ts-expect-error Even though we used jest.mocked('logger'), typescript still won't be able to tell that mongoose module is mocked
logger.error.mockReturnValue(errorMessage);

it('should fail to connect to mongodb database', async () => {
  // @ts-expect-error Even though we used jest.mocked('mongoose'), typescript still won't be able to tell that mongoose module is mocked
  mongoose.connect.mockRejectedValue(errorMessage);

  const db: typeof mongoose | void = await establishDbConnection();
  expect(logger.error).toHaveBeenCalled();
  expect(logger.error).toHaveBeenCalledWith(errorMessage);
  expect(db).toBeUndefined();
});

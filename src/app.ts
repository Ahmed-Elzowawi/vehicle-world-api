import express, { Express } from 'express';
import { handleAppMiddleware } from 'api/v1/middlewares/index';

export const app: Express = express();

handleAppMiddleware(app);

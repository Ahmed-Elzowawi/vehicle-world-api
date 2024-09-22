import express, { Express } from 'express';
import { handleRoutes } from 'api/v1/routes/index';
import { handleAppMiddleware } from 'api/v1/middlewares/index';

export const app: Express = express();

handleAppMiddleware(app);

handleRoutes(app);

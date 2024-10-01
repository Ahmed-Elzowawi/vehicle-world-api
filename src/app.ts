import express, { Express } from 'express';
import { handleRoutes } from './routes/index.js';
import { handleAppMiddleware } from './middlewares/index.js';

export const app: Express = express();

handleAppMiddleware(app);

handleRoutes(app);

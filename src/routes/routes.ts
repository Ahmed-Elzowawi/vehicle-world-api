import express, {
  ErrorRequestHandler,
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import { handleRouters } from '../routers/index.js';
import { logger } from '../config/index.js';

const entrypoint: string = '/api/v1';
export const UnavailableRoute = (req: Request, res: Response) => {
  return res.status(404).end();
};

const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  next: NextFunction,
) => {
  logger.error(err);
  return res.status(400).send({ error: 'Bad Request' });
};

export const vehiclesRouter: Router = express.Router();

export const handleRoutes = (app: Express): void => {
  // vehicles
  app.use(entrypoint, handleRouters(vehiclesRouter));

  // Unavailable endpoints
  app.use(UnavailableRoute);

  app.use(errorHandler);
};

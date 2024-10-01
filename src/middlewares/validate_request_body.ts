import { Request, Response, NextFunction } from 'express';
import { AnyObject, ObjectSchema, ValidationError } from 'yup';

// Used for GET and DELETE HTTP request
export const validateRequestBodyIsEmpty = (
  req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line
): Response<any, Record<string, any>> | void => {
  if (req.body && Object.keys(req.body).length > 0)
    return res.status(400).json({ error: `request body is not required for ${req.method} method` });
  else next();
};

export const validateRequestBodyIsNotEmpty = (
  req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line
): Response<any, Record<string, any>> | void => {
  if (!req.body || Object.keys(req.body).length === 0)
    return res.status(400).json({ error: 'request body is empty' });
  else next();
};

export const validateRequestBodyIsJson = (
  req: Request,
  res: Response,
  next: NextFunction,
  // eslint-disable-next-line
): Response<any, Record<string, any>> | void => {
  if (!req.is('application/json')) return res.status(415).end();
  else next();
};

export const validateVehicleRequestBody =
  (schema: ObjectSchema<AnyObject>) => async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    let isError = false;

    await schema.validate(body).catch((err: ValidationError) => {
      isError = true;
      return res.status(422).json({ error: err.message });
    });
    if (isError) return;
    else next();
  };

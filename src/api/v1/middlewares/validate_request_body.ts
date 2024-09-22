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

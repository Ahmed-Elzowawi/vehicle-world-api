import { Request, Response, NextFunction } from 'express';
import {
  validateRequestBodyIsEmpty,
  validateRequestBodyIsJson,
  validateRequestBodyIsNotEmpty,
  validateVehicleRequestBody,
} from './validate_request_body.js';
import { AnyObject, ObjectSchema } from 'yup';

describe('validateRequestBodyIsEmpty', () => {
  const req = { method: 'GET', body: { key1: 'value1' } } as unknown as Request;
  const res = {
    status: jest.fn().mockReturnValue({ json: jest.fn() }),
  } as unknown as Response;
  const next = jest.fn() as unknown as NextFunction;

  it('should respond with status code 400 when a body is included in a HTTP request', () => {
    validateRequestBodyIsEmpty(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should respond with an error message as json when a body is included in a HTTP request', () => {
    validateRequestBodyIsEmpty(req, res, next);
    expect(res.status(400).json).toHaveBeenCalled();
    expect(res.status(400).json).toHaveBeenCalledWith({
      error: `request body is not required for ${req.method} method`,
    });
  });

  it('should call "next" function when sending a HTTP request without body', () => {
    req.body = {};
    validateRequestBodyIsEmpty(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('validateRequestBodyIsNotEmpty', () => {
  const req = { body: {} } as unknown as Request;
  const res = {
    status: jest.fn().mockReturnValue({ json: jest.fn() }),
  } as unknown as Response;
  const next = jest.fn() as unknown as NextFunction;

  it('should respond with status code 400 when sending a HTTP request without a body', () => {
    validateRequestBodyIsNotEmpty(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should respond with an error message as json when sending a HTTP request without a body', () => {
    validateRequestBodyIsNotEmpty(req, res, next);
    expect(res.status(400).json).toHaveBeenCalled();
    expect(res.status(400).json).toHaveBeenCalledWith({ error: 'request body is empty' });
  });

  it('should call "next" function when a body is included in a HTTP request', () => {
    req.body = { key1: 'value1' };
    validateRequestBodyIsNotEmpty(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('validateRequestBodyIsJson', () => {
  const req = { is: jest.fn().mockReturnValue(false) } as unknown as Request;
  const res = {
    status: jest.fn().mockReturnValue({ end: jest.fn() }),
  } as unknown as Response;
  const next = jest.fn() as unknown as NextFunction;

  it('should respond with status code 400 when "Content-Type: application/json" header is not included', () => {
    validateRequestBodyIsJson(req, res, next);
    expect(res.status).toHaveBeenCalledWith(415);
  });

  it('should end current response process when "Content-Type: application/json" header is not included', () => {
    validateRequestBodyIsJson(req, res, next);
    expect(res.status(415).end).toHaveBeenCalled();
  });

  it('should call "next" function when "Content-Type: application/json" header is included', () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    req.is.mockReturnValue(true);
    validateRequestBodyIsJson(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('validateVehicleRequestBody', () => {
  const mockedSchema = {
    validate: jest.fn().mockRejectedValue({ message: 'validation failed' }),
  } as unknown as ObjectSchema<AnyObject>;

  const req = { body: { key1: 'value1' } } as unknown as Request;
  const res = {
    status: jest.fn().mockReturnValue({ json: jest.fn() }),
  } as unknown as Response;
  const next = jest.fn() as unknown as NextFunction;

  type ValidateVehicleRequestBodyMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;

  const validateVehicleRequestBodyMiddleware: ValidateVehicleRequestBodyMiddleware =
    validateVehicleRequestBody(mockedSchema);

  it('should respond with status code 422 when vehicle body validation fails', async () => {
    await validateVehicleRequestBodyMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(422);
  });

  it('should respond with an error message as json', async () => {
    await validateVehicleRequestBodyMiddleware(req, res, next);
    expect(res.status(422).json).toHaveBeenCalled();
    expect(res.status(422).json).toHaveBeenCalledWith({
      error: 'validation failed',
    });
  });

  it('should call "next" function when vehcile body validation succeed', async () => {
    const mockedSchema = {
      validate: jest.fn().mockResolvedValue(true),
    } as unknown as ObjectSchema<AnyObject>;
    const validateVehicleRequestBodyMiddleware: ValidateVehicleRequestBodyMiddleware =
      validateVehicleRequestBody(mockedSchema);

    await validateVehicleRequestBodyMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

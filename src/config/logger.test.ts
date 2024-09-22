import { createLogger, format, transports } from 'winston';
import { developmentLogger, productionLogger } from './logger';

const { combine, timestamp } = format;

jest.mock('winston', () => {
  return {
    createLogger: jest.fn(),
    format: {
      combine: jest.fn(),
      colorize: jest.fn(),
      errors: jest.fn(),
      simple: jest.fn(),
      json: jest.fn(),
      timestamp: jest.fn(),
    },
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
  };
});

describe('logger for development environment', () => {
  beforeAll(() => {
    developmentLogger;
  });

  it('should create a logger for the development environment', () => {
    expect(createLogger).toHaveBeenCalled();
    expect(createLogger).toHaveBeenCalledWith({
      level: 'debug',
      format: combine(format.colorize(), format.errors({ stack: true }), format.simple()),
      transports: [new transports.Console()],
    });
  });

  test('logger format', () => {
    expect(combine).toHaveBeenCalled();

    expect(combine).toHaveBeenCalledWith(
      format.colorize(),
      format.errors({ stack: true }),
      format.simple(),
    );

    expect(format.colorize).toHaveBeenCalled();
    expect(format.errors).toHaveBeenCalled();
    expect(format.simple).toHaveBeenCalled();

    expect(format.errors).toHaveBeenCalledWith({ stack: true });
  });

  test('transports', () => {
    expect(transports.Console).toHaveBeenCalled();
  });
});

describe('logger for production environment', () => {
  beforeAll(() => {
    productionLogger;
  });

  it('should create a logger for the production environment', () => {
    expect(createLogger).toHaveBeenCalled();
    expect(createLogger).toHaveBeenCalledWith({
      level: 'info',
      format: combine(timestamp(), format.errors({ stack: true }), format.json()),
      defaultMeta: { service: 'Vehicle World API server' },
      transports: [
        new transports.File({ filename: 'info.log', level: 'error' }),
        new transports.File({ filename: 'warn.log', level: 'warn' }),
        new transports.File({ filename: 'error.log', level: 'info' }),
      ],
    });
  });

  test('logger format', () => {
    expect(combine).toHaveBeenCalled();

    expect(combine).toHaveBeenCalledWith(
      timestamp(),
      format.errors({ stack: true }),
      format.json(),
    );

    expect(timestamp).toHaveBeenCalled();
    expect(format.errors).toHaveBeenCalled();
    expect(format.json).toHaveBeenCalled();

    expect(format.errors).toHaveBeenCalledWith({ stack: true });
  });

  test('transports', () => {
    expect(transports.File).toHaveBeenCalled();

    expect(transports.File).toHaveBeenCalledWith({ filename: 'info.log', level: 'error' });
    expect(transports.File).toHaveBeenCalledWith({ filename: 'warn.log', level: 'warn' });
    expect(transports.File).toHaveBeenCalledWith({ filename: 'error.log', level: 'info' });
  });
});

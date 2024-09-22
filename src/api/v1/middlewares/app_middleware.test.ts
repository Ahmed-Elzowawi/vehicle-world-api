import express, { Express } from 'express';
import { expect } from '@jest/globals';
import { handleAppMiddleware } from './app_middleware';
import methodOverride from 'method-override';
import helmet from 'helmet';
import compression from 'compression';

jest.mock('express');
jest.mock('method-override');
jest.mock('helmet');
jest.mock('compression');

describe('handleAppMiddleware', () => {
  const app = { use: jest.fn() } as unknown as Express;
  it('should use express.json middleware', () => {
    handleAppMiddleware(app);
    expect(app.use).toBeCalledWith(express.json());
  });

  it('should use methodoverride middleware', () => {
    handleAppMiddleware(app);
    expect(app.use).toBeCalledWith(methodOverride('_method'));
  });

  it('should use halmet middleware', () => {
    handleAppMiddleware(app);
    expect(app.use).toBeCalledWith(helmet());
  });

  it('should use compression middleware', () => {
    handleAppMiddleware(app);
    expect(app.use).toBeCalledWith(compression());
  });
});

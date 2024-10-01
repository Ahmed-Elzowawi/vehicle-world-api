import { handleRouters } from 'api/v1/routers';
import { handleRoutes, UnavailableRoute, vehiclesRouter } from './routes';
import { Express } from 'express';

const app = { use: jest.fn() } as unknown as Express;

describe('Avialable routes endpoints', () => {
  test('vehicle endpoints', () => {
    handleRoutes(app);
    expect(app.use).toHaveBeenCalledWith('/api/v1', handleRouters(vehiclesRouter));
  });
});

test('Unavailable endpoints', () => {
  handleRoutes(app);
  expect(app.use).toHaveBeenCalledWith(UnavailableRoute);
});

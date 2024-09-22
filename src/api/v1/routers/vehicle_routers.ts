import { Router } from 'express';

export const handleRouters = (vehiclesRouter: Router): Router => {
  vehiclesRouter.get('/vehicles/:id');

  vehiclesRouter.post('/vehicles');

  vehiclesRouter.patch('/vehicles/:id');

  vehiclesRouter.delete('/vehicles/:id');

  return vehiclesRouter;
};

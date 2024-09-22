import { Router } from 'express';
import {
  getVehicleController,
  postVehicleController,
} from 'api/v1/controllers';


export const handleRouters = (vehiclesRouter: Router): Router => {
  vehiclesRouter.get('/vehicles/:id', getVehicleController);

  vehiclesRouter.post(
    '/vehicles',
    postVehicleController,
  );

  vehiclesRouter.patch('/vehicles/:id');

  vehiclesRouter.delete('/vehicles/:id');

  return vehiclesRouter;
};

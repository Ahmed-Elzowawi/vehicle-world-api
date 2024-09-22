import { Router } from 'express';
import {
  validateRequestBodyIsEmpty,
} from 'api/v1/middlewares';
import {
  getVehicleController,
  patchVehicleController,
  postVehicleController,
  deleteVehicleController,
} from 'api/v1/controllers';


export const handleRouters = (vehiclesRouter: Router): Router => {
  vehiclesRouter.get('/vehicles/:id', validateRequestBodyIsEmpty, getVehicleController);

  vehiclesRouter.post(
    '/vehicles',
    postVehicleController,
  );

  vehiclesRouter.patch(
    '/vehicles/:id',
    patchVehicleController,
  );

  vehiclesRouter.delete('/vehicles/:id', validateRequestBodyIsEmpty, deleteVehicleController);

  return vehiclesRouter;
};

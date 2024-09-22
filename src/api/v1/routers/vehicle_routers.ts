import { Router } from 'express';
import {
  validateRequestBodyIsEmpty,
  validateRequestBodyIsNotEmpty,
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
    validateRequestBodyIsNotEmpty,
    postVehicleController,
  );

  vehiclesRouter.patch(
    '/vehicles/:id',
    validateRequestBodyIsNotEmpty,
    patchVehicleController,
  );

  vehiclesRouter.delete('/vehicles/:id', validateRequestBodyIsEmpty, deleteVehicleController);

  return vehiclesRouter;
};

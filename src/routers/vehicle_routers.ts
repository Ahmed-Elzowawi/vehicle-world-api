import { Router } from 'express';
import {
  validateRequestBodyIsEmpty,
  validateRequestBodyIsJson,
  validateRequestBodyIsNotEmpty,
  validateVehicleRequestBody,
} from '../middlewares/index.js';
import {
  getVehicleController,
  patchVehicleController,
  postVehicleController,
  deleteVehicleController,
} from '../controllers/index.js';
import { vehicleSchemaPatchMethod, vehicleSchemaPostMethod } from '../validations/index.js';

export const validateVehiclePostRequestBody = validateVehicleRequestBody(vehicleSchemaPostMethod);

export const validateVehiclePatchRequestBody = validateVehicleRequestBody(vehicleSchemaPatchMethod);
export const handleRouters = (vehiclesRouter: Router): Router => {
  vehiclesRouter.get('/vehicles/:id', validateRequestBodyIsEmpty, getVehicleController);

  vehiclesRouter.post(
    '/vehicles',
    validateRequestBodyIsJson,
    validateRequestBodyIsNotEmpty,
    validateVehiclePostRequestBody,
    postVehicleController,
  );

  vehiclesRouter.patch(
    '/vehicles/:id',
    validateRequestBodyIsJson,
    validateRequestBodyIsNotEmpty,
    validateVehiclePatchRequestBody,
    patchVehicleController,
  );

  vehiclesRouter.delete('/vehicles/:id', validateRequestBodyIsEmpty, deleteVehicleController);

  return vehiclesRouter;
};

import {
  handleRouters,
  validateVehiclePatchRequestBody,
  validateVehiclePostRequestBody,
} from './vehicle_routers.js';
import { Router } from 'express';
import {
  validateRequestBodyIsEmpty,
  validateRequestBodyIsJson,
  validateRequestBodyIsNotEmpty,
} from '../middlewares/index.js';
import {
  getVehicleController,
  patchVehicleController,
  postVehicleController,
  deleteVehicleController,
} from '../controllers/index.js';

describe('Vehcile Routers', () => {
  const mockedVehicleRouter = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  } as unknown as Router;

  it('should handle get router', () => {
    handleRouters(mockedVehicleRouter);
    expect(mockedVehicleRouter.get).toHaveBeenCalled();
    expect(mockedVehicleRouter.get).toHaveBeenCalledWith(
      '/vehicles/:id',
      validateRequestBodyIsEmpty,
      getVehicleController,
    );
  });

  it('should handle post router', () => {
    handleRouters(mockedVehicleRouter);
    expect(mockedVehicleRouter.post).toHaveBeenCalled();
    expect(mockedVehicleRouter.post).toHaveBeenCalledWith(
      '/vehicles',
      validateRequestBodyIsJson,
      validateRequestBodyIsNotEmpty,
      validateVehiclePostRequestBody,
      postVehicleController,
    );
  });

  it('should handle patch router', () => {
    handleRouters(mockedVehicleRouter);
    expect(mockedVehicleRouter.patch).toHaveBeenCalled();
    expect(mockedVehicleRouter.patch).toHaveBeenCalledWith(
      '/vehicles/:id',
      validateRequestBodyIsJson,
      validateRequestBodyIsNotEmpty,
      validateVehiclePatchRequestBody,
      patchVehicleController,
    );
  });

  it('should handle delete router', () => {
    handleRouters(mockedVehicleRouter);
    expect(mockedVehicleRouter.delete).toHaveBeenCalled();
    expect(mockedVehicleRouter.delete).toHaveBeenCalledWith(
      '/vehicles/:id',
      validateRequestBodyIsEmpty,
      deleteVehicleController,
    );
  });
});

import 'dotenv/config';
import { Request, Response } from 'express';
import { expect } from '@jest/globals';
import {
  getVehicleController,
  postVehicleController,
  patchVehicleController,
  deleteVehicleController,
} from './vehicles_controllers.js';
import { Vehicle } from '../models/index.js';

jest.mock('../models', () => {
  return {
    Vehicle: {
      findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(null) }),
      create: jest.fn().mockRejectedValue(null),
      findByIdAndUpdate: jest.fn().mockRejectedValue(null),
      findByIdAndDelete: jest.fn().mockRejectedValue(null),
    },
  };
});

describe('getVehicleController', () => {
  const req = {
    params: {
      id: '507f1f77bcf86cd799439011',
    },
  } as unknown as Request<{ id: string }>;

  const res = {
    status: jest.fn().mockReturnValue({ end: jest.fn(), json: jest.fn() }),
  } as unknown as Response;

  it("should responsd with status code 400 when req.params doesn't exist", async () => {
    const req = {} as unknown as Request<any>;
    await getVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should build the query to find a vehicle by id', async () => {
    await getVehicleController(req, res);
    expect(Vehicle.findById).toHaveBeenCalled();
    expect(Vehicle.findById).toHaveBeenCalledWith(req.params.id, [
      '_id',
      'manufacturer',
      'model',
      'fuel',
      'type',
      'color',
      'VIN',
      'VRM',
      'used',
      'modelYear',
      'createdAt',
      'updatedAt',
    ]);
  });

  it('should execute mongoose findById query', async () => {
    await getVehicleController(req, res);
    expect(Vehicle.findById(req.params.id).exec).toBeCalled();
  });

  it('should respond with status code 500 when an internal error happens while trying to exec mongoose findById query', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findById.mockReturnValue({ exec: jest.fn().mockRejectedValue(null) });
    await getVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should end the current response process when an internal error happens while trying to exec mongoose findById query', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    await getVehicleController(req, res);
    expect(res.status(500).end).toHaveBeenCalled();
  });

  it('should responsd with status code 404 for non existing id', async () => {
    await getVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("should end the current response process when id doesn't exist", async () => {
    await getVehicleController(req, res);
    expect(res.status(404).end).toHaveBeenCalled();
  });

  it('should responsd with status code 200 for an existing vehicle id', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(true) });
    await getVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  // VehicleData is an object
  it('should responsd with { data: vehicleData } as json', async () => {
    const mockedVehicleData = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    } as const;
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findById.mockReturnValue({ exec: jest.fn().mockResolvedValue(mockedVehicleData) });
    await getVehicleController(req, res);
    expect(res.status(200).json).toHaveBeenCalled();
    expect(res.status(200).json).toHaveBeenCalledWith({ data: mockedVehicleData });
  });

  describe('id length less than 24', () => {
    beforeAll(() => {
      req.params.id = '507f1f77bcf';
    });

    it("should responsd with status code 400 when id length doesn't equal 24", async () => {
      await getVehicleController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should end the current response process when id length doesn't equal 24", async () => {
      await getVehicleController(req, res);
      expect(res.status(400).end).toHaveBeenCalled();
    });
  });
});

describe('postVehicleController', () => {
  const mockedNewVehicle = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  } as const;

  const req = {
    body: mockedNewVehicle,
  } as unknown as Request<typeof mockedNewVehicle>;

  const res = {
    status: jest.fn().mockReturnValue({ end: jest.fn(), json: jest.fn() }),
  } as unknown as Response;

  it('should execute mongoose create query', async () => {
    await postVehicleController(req, res);
    expect(Vehicle.create).toBeCalled();
    expect(Vehicle.create).toBeCalledWith(mockedNewVehicle);
  });

  it('should respond with status 500 when an internal error happens while trying findByIdAndUpdateto creaet a new vehicle', async () => {
    await postVehicleController(req, res);
    expect(res.status).toBeCalledWith(500);
  });

  it('should end current response process when an internal error happens while trying to creaet a new vehicle', async () => {
    await postVehicleController(req, res);
    expect(res.status(500).end).toBeCalled();
  });

  it('should respond with status code 201 when a new vehicle is created', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.create.mockResolvedValue(true);
    await postVehicleController(req, res);
    expect(res.status).toBeCalledWith(201);
  });

  // newVehicle is an object
  it('should responsd with { data: newVehicle } as json', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.create.mockResolvedValue(mockedNewVehicle);
    await postVehicleController(req, res);
    expect(res.status(201).json).toBeCalled();
    expect(res.status(201).json).toBeCalledWith({ data: mockedNewVehicle });
  });
});

describe('patchVehicleController', () => {
  const mockedVehicle = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  } as const;

  const req = {
    params: {
      id: '507f1f77bcf86cd799439011',
    },
    body: mockedVehicle,
  } as unknown as Request<{ id: string; body: typeof mockedVehicle }>;

  const res = {
    status: jest.fn().mockReturnValue({ end: jest.fn(), json: jest.fn() }),
  } as unknown as Response;

  it("should responsd with status code 400 when req.params doesn't exist", async () => {
    const req = {} as unknown as Request<any>;
    await patchVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should execute mongoose findByIdAndUpdate query', async () => {
    await patchVehicleController(req, res);
    expect(Vehicle.findByIdAndUpdate).toHaveBeenCalled();
    expect(Vehicle.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, mockedVehicle);
  });

  it('should respond with status code 500 when an internal error happens while trying to exec mongoose findByIdAndUpdate query', async () => {
    await patchVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should end the current response process when an internal error happens while trying to exec mongoose findByIdAndUpdate query', async () => {
    await patchVehicleController(req, res);
    expect(res.status(500).end).toHaveBeenCalled();
  });

  it('should responsd with status code 404 for non existing id', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findByIdAndUpdate.mockResolvedValue(null);
    await patchVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("should end the current response process when id doesn't exist", async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findByIdAndUpdate.mockResolvedValue(null);
    await patchVehicleController(req, res);
    expect(res.status(404).end).toHaveBeenCalled();
  });

  it('should responsd with status code 204 when the vehicle is patched', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findByIdAndUpdate.mockResolvedValue(true);
    await patchVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('should end the current response process when the vehicle is patched', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findByIdAndUpdate.mockResolvedValue(true);
    await patchVehicleController(req, res);
    expect(res.status(204).end).toHaveBeenCalled();
  });

  describe('id length less than 24', () => {
    beforeAll(() => {
      req.params.id = '507f1f77bcf';
    });

    it("should responsd with status code 400 when id length doesn't equal 24", async () => {
      await patchVehicleController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should end the current response process when id length doesn't equal 24", async () => {
      await patchVehicleController(req, res);
      expect(res.status(400).end).toHaveBeenCalled();
    });
  });
});

describe('deleteVehicleController', () => {
  const req = {
    params: {
      id: '507f1f77bcf86cd799439011',
    },
  } as unknown as Request<{ id: string }>;

  const res = {
    status: jest.fn().mockReturnValue({ end: jest.fn(), json: jest.fn() }),
  } as unknown as Response;

  it("should responsd with status code 400 when req.params doesn't exist", async () => {
    const req = {} as unknown as Request<any>;
    await deleteVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should execute mongoose findByIdAndDelete query', async () => {
    await deleteVehicleController(req, res);
    expect(Vehicle.findByIdAndDelete).toHaveBeenCalled();
    expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
  });

  it('should respond with status code 500 when an internal error happens while trying to exec mongoose findByIdAndDelete query', async () => {
    await deleteVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should end the current response process when an internal error happens while trying to exec mongoose findByIdAndDelete query', async () => {
    await deleteVehicleController(req, res);
    expect(res.status(500).end).toHaveBeenCalled();
  });

  it('should responsd with status code 404 for non existing id', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findByIdAndDelete.mockResolvedValue(null);
    await deleteVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("should end the current response process when id doesn't exist", async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findByIdAndDelete.mockResolvedValue(null);
    await deleteVehicleController(req, res);
    expect(res.status(404).end).toHaveBeenCalled();
  });

  it('should responsd with status code 204 when the vehicle is deleted', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findByIdAndDelete.mockResolvedValue(true);
    await deleteVehicleController(req, res);
    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('should end the current response process when the vehicle is deleted', async () => {
    // @ts-expect-error Even though we used jest.mocked('api/v1/models'), typescript still won't be able to tell that Vehicle module is mocked
    Vehicle.findByIdAndDelete.mockResolvedValue(true);
    await deleteVehicleController(req, res);
    expect(res.status(204).end).toHaveBeenCalled();
  });

  describe('id length less than 24', () => {
    beforeAll(() => {
      req.params.id = '507f1f77bcf';
    });

    it("should responsd with status code 400 when id length doesn't equal 24", async () => {
      await deleteVehicleController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("should end the current response process when id length doesn't equal 24", async () => {
      await deleteVehicleController(req, res);
      expect(res.status(400).end).toHaveBeenCalled();
    });
  });
});

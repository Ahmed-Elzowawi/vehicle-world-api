import { Request, Response } from 'express';
import { Vehicle } from 'api/v1/models';

export const getVehicleController = async (
  req: Request<{ id: string }>,
  res: Response,
  // eslint-disable-next-line
): Promise<Response<any, Record<string, any>> | undefined> => {
  if (!req.params) return res.status(400).end();
  const vehicleId = req.params.id;

  // MongoDB _id field is a 24 long hexadecimal string
  if (vehicleId.length !== 24) return res.status(400).end();

  let isError: boolean = false;
  const vehicle = await Vehicle.findById(vehicleId, [
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
  ])
    .exec()
    .catch(() => {
      isError = true;
      return res.status(500).end();
    });
  if (isError) return;

  if (!vehicle) return res.status(404).end();
  else return res.status(200).json({ data: vehicle });
};

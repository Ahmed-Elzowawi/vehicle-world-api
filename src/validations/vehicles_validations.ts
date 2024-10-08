import { object, string, number, boolean } from 'yup';

const nextYear: number = new Date().getFullYear() + 1;

export const vehicleSchemaPostMethod = object({
  manufacturer: string().lowercase().max(30).trim().required(),
  model: string().lowercase().max(30).trim().required(),
  fuel: string().lowercase().max(20).trim().required(),
  type: string().lowercase().max(30).trim().required(),
  color: string().lowercase().max(25).trim().required(),
  VIN: string()
    .length(17)
    .matches(/^[a-zA-Z0-9]*$/, { message: 'VIN must not contain whitespace' })
    .uppercase()
    .required(),
  VRM: string()
    .length(7)
    .matches(/^[a-zA-Z0-9]*$/, { message: 'VRM must not contain whitespace' })
    .uppercase()
    .required(),
  used: boolean().required(),
  modelYear: number().max(nextYear).required(),
})
  .strict(true)
  .noUnknown(true, 'unknown property: ${unknown}');

export const vehicleSchemaPatchMethod = object({
  manufacturer: string().lowercase().max(30).trim().optional(),
  model: string().lowercase().max(30).trim().optional(),
  fuel: string().lowercase().max(20).trim().optional(),
  type: string().lowercase().max(30).trim().optional(),
  color: string().lowercase().max(25).trim().optional(),
  VIN: string()
    .length(17)
    .matches(/^[a-zA-Z0-9]*$/, { message: 'VIN must not contain whitespace' })
    .uppercase()
    .optional(),
  VRM: string()
    .length(7)
    .matches(/^[a-zA-Z0-9]*$/, { message: 'VRM must not contain whitespace' })
    .uppercase()
    .optional(),
  used: boolean().optional(),
  modelYear: number().max(nextYear).optional(),
})
  .strict(true)
  .noUnknown(true, 'unknown property: ${unknown}');

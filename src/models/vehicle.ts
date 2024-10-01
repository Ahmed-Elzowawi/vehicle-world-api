import { Schema, model } from 'mongoose';

const vehicleSchema = new Schema(
  {
    manufacturer: { type: String },
    model: { type: String },
    fuel: { type: String },
    type: { type: String },
    color: { type: String },
    VIN: { type: String },
    VRM: { type: String },
    used: { type: Boolean },
    modelYear: { type: Number },
  },
  { timestamps: true, versionKey: false },
);

export const Vehicle = model('Vehicle', vehicleSchema, 'vehicles');

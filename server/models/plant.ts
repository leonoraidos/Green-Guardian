import mongoose, { Document } from 'mongoose';

export interface IPlant extends Document {
  name: string;
  watering: string;
  edible: string;
  cycle: string;
  sunlight: string;
  scheduled: boolean;
}

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  watering: {
    type: String,
    required: true,
  },
  edible: {
    type: String,
    required: true,
  },
  cycle: {
    type: String,
    required: true,
  },
  sunlight: {
    type: String,
    required: true,
  },
  scheduled: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model<IPlant>('Plant', plantSchema);
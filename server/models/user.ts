import { Document } from 'mongoose';
import mongoose from '../db';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);
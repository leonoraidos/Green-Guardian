import { Document } from 'mongoose';
import mongoose from '../db';


interface IUser extends Document{
  _id?: number,
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface ReqUser {
  user: {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
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

const USER = mongoose.model('User', userSchema);

export { USER };
export { IUser };
export {ReqUser}
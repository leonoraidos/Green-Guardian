import { Request as ExpressRequest } from 'express';
const { IUser } =  require('../models/user');

export interface Request extends ExpressRequest {
  user?: typeof IUser;
}
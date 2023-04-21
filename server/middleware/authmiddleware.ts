import { Response, NextFunction } from 'express';
import { Request } from '../types/user';
import jwt, { Secret } from 'jsonwebtoken';
import User, { IUser } from './../models/user';
import USER from '../models/user';


const SECRET_KEY: Secret = process.env.SECRET_KEY || 'super secret dont use this what';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // extract token from auth headers
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403) as unknown as void;
  const token = authHeaders.split(' ')[1];

  try {
    // verify & decode token payload,
    const { _id } = jwt.verify(token, SECRET_KEY) as { _id: string };
    // Have to be USER.USER due to the way we export it in models/user.ts
    const user: IUser | null = await USER.USER.findOne({ _id });
    if (!user) return res.sendStatus(401) as unknown as void;
    req.user = user;
    return next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export default authMiddleware;

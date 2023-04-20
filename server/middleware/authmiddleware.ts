import { Response, NextFunction } from 'express';
import { Request } from '../types/user';
import jwt, { Secret } from 'jsonwebtoken';
import User, { IUser } from './../models/user';

const SECRET_KEY: Secret = process.env.SECRET_KEY || 'super secret dont use this what';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // extract token from auth headers
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403) as unknown as void;
  const token = authHeaders.split(' ')[1];

  try {
    // verify & decode token payload,
    const { _id } = jwt.verify(token, SECRET_KEY) as { _id: string };
    // attempt to find user object and set to req
    const user: IUser | null = await User.findOne({ _id });
    if (!user) return res.sendStatus(401) as unknown as void;
    req.user = user;
    return next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export default authMiddleware;

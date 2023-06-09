import { Response, NextFunction } from 'express';
import { Request } from '../types/user';
import jwt, { Secret } from 'jsonwebtoken';
import {USER,  IUser } from './../models/user';



const SECRET_KEY: Secret = process.env.SECRET_KEY || 'super secret dont use this what';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // extract token from auth headers
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.status(403).json({message: "Authentication Header Missing"});
  const token = authHeaders.split(' ')[1];

  try {
    // verify & decode token payload,
    const { _id } = jwt.verify(token, SECRET_KEY) as { _id: string };
    const user: IUser | null = await USER.findOne({ _id });
    if (!user) return res.status(401).json({message: "User Unauthorized"});
    req.user = user;
    return next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export default authMiddleware;

import { Response } from 'express';
import { Request } from '../types/user';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
const { USER, IUser } =  require('../models/user');
const SECRET_KEY: string = process.env.SECRET_KEY || 'super secret dont use this what';

export const create = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await USER.findOne({ email: email });
    if (user) {
      res.status(409).send({ error: '409', message: 'User already exists' });
      return;
    }
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = new USER({
      ...req.body,
      password: hash,
    });
    const { _id } = await newUser.save();
    const accessToken = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send({ accessToken, message: 'User created successfully' });
  } catch (error) {
    res.status(400).send({ error: error, message: 'Could not create user' });
    console.log(error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await USER.findOne({ email: email });
    if (!user) throw new Error();
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

export const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id, firstName, lastName } = req.user;
    const user = { _id, firstName, lastName };
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ error, message: 'Resource not found' });
  }
};

export const logout = (req: Request, res: Response): void => {
  // delete the token client side upon logout.
  // you would invalidate the token here.
};
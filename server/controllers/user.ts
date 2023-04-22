import { Response } from 'express';
import { Request } from '../types/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { USER } from '../models/user';
const SECRET_KEY: string = process.env.SECRET_KEY || 'super secret dont use this what';

export const create = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) { res.status(400).json({message: "All fields are required"});}

  try {
    // Have to be USER.USER due to the way we export it in models/user.ts
    const user = await USER.findOne({ email: email });
    if (user) {
      res.status(409).send({ error: '409', message: 'User already exists' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new USER ({
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

  if (!email || !password) { res.status(400).json({message: "All fields are required"});}
  try {
    const user = await USER.findOne({ email: email });

    if (!user) throw new Error();

    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();

    const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send({ accessToken });

  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};



export const profile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401);
  }
  try {

    const { _id, firstName, lastName } = req.user;

    res.status(200).send({ _id, firstName, lastName });

  } catch (error) {

    res.status(404).send({ error, message: 'Resource not found' });

  }

  
};


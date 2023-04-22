import { Request, Response } from 'express';

export const save = async (req: Request, res: Response) => {
  const nameToId = req.body.plantInfo.plant_name;
  console.log(nameToId);
}
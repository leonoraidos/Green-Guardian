import { Request, Response } from 'express';
import axios from 'axios';

export const getPlant = async (req: Request, res: Response): Promise<void> => {
  const base64Img = req.body.image;
  const images = Array.isArray(base64Img) ? base64Img : [base64Img];

  const data = {
    api_key: process.env.PLANTIDKEY,
    images: images,
    plant_language: "en",
    plant_details: ["common_names", "edible_parts", "propagation_methods", "synonyms", "taxonomy", "url", "watering"],
  };

  axios.post('https://api.plant.id/v2/identify', data).then(plantResponse => {
    console.log('Success:', plantResponse.data);

    const { id, plant_name, plant_details } = plantResponse.data.suggestions[0];
    const plantInfo = { id, plant_name, plant_details };
    res.send(plantInfo);
    //console.log(plantInfo);
  }).catch(err => {
      console.log('Error: ', err);
  })
}

export const savePlant = async (req: Request, res: Response) => {
  console.log('code will be here wooo', req, res);
}
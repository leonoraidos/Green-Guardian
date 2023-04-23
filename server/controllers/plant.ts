import { Response } from 'express';
import { IPlant, AuthenticatedRequest } from '../types/plants';
import { PLANT } from '../models/plant';



export const save = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401);
  }

  try {
    const plantInfo = req.body.plantInfo;
    const plant: IPlant = new PLANT({
      id: plantInfo.id,
      plant_name: plantInfo.plant_name,
      user: req.user._id,
      plant_details: {
        common_names: plantInfo.plant_details.common_names || [],
        edible_parts: plantInfo.plant_details.edible_parts || [],
        propagation_methods: plantInfo.plant_details.propagation_methods || [],
        scientific_name: plantInfo.plant_details.scientific_name || '',
        structured_name: plantInfo.plant_details.structured_name || { genus: '', species: '' },
        synonyms: plantInfo.plant_details.synonyms || [],
        taxonomy: plantInfo.plant_details.taxonomy || { class: '', family: '', genus: '', kingdom: '', order: '', phylum: '' },
        url: plantInfo.plant_details.url || '',
        watering: plantInfo.plant_details.watering || { max: 0, min: 0 },
      },
    });

    await plant.save();
    res.status(200).json({ message: 'Plant saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save plant' });
  }
}

export const getPlants = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401);
  }

  try {
    const plants = await PLANT.find({ user: req.user._id });
    console.log('PLANTS: ', plants);

    res.status(200).send({ plants, message: "Plants retrieved successfully" });
  } catch (error) {
    console.log('error is in the controller', error);
    res.status(404).send({ error, message: 'User has no plants saved' });
  }
}
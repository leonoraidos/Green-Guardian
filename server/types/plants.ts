import mongoose, { Document } from 'mongoose';
import { Request } from 'express';

interface IPlantDetails {
  common_names: string[];
  edible_parts?: string[];
  propagation_methods?: string[];
  scientific_name?: string;
  structured_name?: {
    genus: string;
    species: string;
  };
  synonyms?: string[];
  taxonomy?: {
    class: string;
    family: string;
    genus: string;
    kingdom: string;
    order: string;
    phylum: string;
  };
  url?: string;
  watering?: {
    max: number;
    min: number;
  };
}

export interface IPlant extends Document {
  plant_name: string;
  id: number;
  user: mongoose.Schema.Types.ObjectId;
  plant_details: IPlantDetails;
}

export interface AuthenticatedRequest extends Request {
  user?: { _id: string; firstName: string; lastName: string };
}
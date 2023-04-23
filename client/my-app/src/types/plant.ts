export interface IPlantInfo {
  plant_name: string;
  id: number;
  plant_details: {
    common_names?: string[];
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

}

export interface PlantCardProps {
  plantInfo?: IPlantInfo | null;
  cardClass: string,
}
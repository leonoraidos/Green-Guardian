export interface IPlantInfo {
  plant_name: string,
  id: number,
  

}

export interface PlantCardProps {
  plantInfo: IPlantInfo | null;
}
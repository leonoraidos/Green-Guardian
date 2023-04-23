import { useState, useEffect } from "react";
import PlantCard from "./PlantCard";
import plantAPI from "../utils/PlantApi";
import { IPlantInfo } from "../types/plant";



const PlantList = () => {

  const [gardenState, setGardenState] = useState<IPlantInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const getPlants = async (accessToken: string) => {
      try {
        setIsLoading(true);
        const  { plants } = await plantAPI.garden(accessToken);
        console.log(plants);
        setGardenState(plants);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (accessToken) {
      getPlants(accessToken);
    }

  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {gardenState.map((plant) => (
        <PlantCard key={plant.id} plantInfo={plant} cardClass="plantListCard"/>
      ))}
    </>
  );
};

export default PlantList;
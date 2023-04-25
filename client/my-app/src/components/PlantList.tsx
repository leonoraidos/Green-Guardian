import { useState, useEffect } from "react";
import PlantCard from "./PlantCard";
import plantAPI from "../utils/PlantApi";
import { IPlantInfo } from "../types/plant";



const PlantList = ({ showAllPlants }: { showAllPlants: boolean }) => {

  const [gardenState, setGardenState] = useState<IPlantInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const getPlants = async (accessToken: string) => {
      try {
        setIsLoading(true);
        const { plants } = await plantAPI.garden(accessToken);
        console.log(plants);
        setGardenState(showAllPlants ? plants : plants.filter((plant: IPlantInfo) => plant.alerts));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (accessToken) {
      getPlants(accessToken);
    }

  }, [showAllPlants]);

  if (isLoading) {
    //better loading to come stay tuned
    return <div>Loading...</div>
  }

  return (
    <>
      {gardenState.map((plant) => (
        <PlantCard key={plant.id} plantInfo={plant} cardClass="plantListCard" isProfile={true} showAllPlants={showAllPlants}/>
      ))}
    </>
  );
};




export default PlantList;
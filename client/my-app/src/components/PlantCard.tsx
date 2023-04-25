import { FC, useState } from "react";
import { PlantCardProps } from "../types/plant";
import plantAPI from "../utils/PlantApi";
import WaterButton from "./WaterAlertButton";
import planticon from '../assests/1148862-200.png';

const PlantCard: FC<PlantCardProps> = ({plantInfo, cardClass, isProfile, showAllPlants}) => {
  const [saved, setSaved] = useState(false);

  if (!plantInfo) {
    return null;
  }


  const accessToken = localStorage.getItem('accessToken')

  const handleSavePlant = async () => {
    if (accessToken !== null) {
      try {
        await plantAPI.savePlant(plantInfo, accessToken);
        setSaved(true);
      } catch (err) {
        console.log(err);
        //skeleton error handling, needs improvement
        return (
          <p>Unable to save plant. Please try again later.</p>
        )
      }
    }
  };

  function getLastWatered(lastWatered: number): string {
    const lastWateredDate = new Date(lastWatered);
    const currentDate = new Date();
    const timeDiff = Math.abs(currentDate.getTime() - lastWateredDate.getTime());
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (days === 1) {
      return `${days} Day ago`;
    } else if (days === 0) {
      return `Today!`
    } else {
      return `${days} Days ago`;
    }

  }


  return (
    <div className="plantCard">
      <div>
        {isProfile && <img className="gardenImg" src={planticon} alt="plant icon"></img>}
      </div>
      <div className={`${cardClass}`}>

        <h2>{plantInfo.plant_name}</h2>
        {showAllPlants && (
          <p className="scientificName">Scientific name 📋: {plantInfo.plant_details.scientific_name ?? 'N/A'}</p>
        )}

        {showAllPlants && plantInfo.plant_details.edible_parts && (
          <p className="edibleParts">Edible parts 🍄: {plantInfo.plant_details.edible_parts.join(", ")}</p>
        )}
        {showAllPlants && plantInfo.plant_details.propagation_methods && (
          <p className="propagation">Propagation methods 🌱 : {plantInfo.plant_details.propagation_methods.join(", ")}</p>
        )}
        {plantInfo.plant_details.watering && (
          <p>Watering 💧: Min {plantInfo.plant_details.watering.min} times per week</p>
        )}
        {!showAllPlants && plantInfo.last_watered && (
          <p>Last watered: {getLastWatered(plantInfo.last_watered)}</p>
        )}

        {showAllPlants && !saved && <button className="saveButton" onClick={handleSavePlant}>Save to your garden!</button>}
        {saved && <p>Plant saved to your garden!</p>}

        {showAllPlants && isProfile && <WaterButton plantInfo={plantInfo}/> }
        </div>
    </div>
  );

};

export default PlantCard;
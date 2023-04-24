import { FC, useState } from "react";
import { PlantCardProps } from "../types/plant";
import plantAPI from "../utils/PlantApi";

const PlantCard: FC<PlantCardProps> = ({plantInfo, cardClass}) => {
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


  return (
    <div className="plantIDCard">
      <div className={`${cardClass}`}>
      <h2>{plantInfo.plant_name}</h2>
      <p>Scientific name: {plantInfo.plant_details.scientific_name ?? 'N/A'}</p>
      {plantInfo.plant_details.edible_parts && (
        <p>Edible parts: {plantInfo.plant_details.edible_parts.join(", ")}</p>
      )}
      {plantInfo.plant_details.propagation_methods && (
        <p>Propagation methods: {plantInfo.plant_details.propagation_methods.join(", ")}</p>
      )}
      {plantInfo.plant_details.watering && (
        <p>Watering: Min {plantInfo.plant_details.watering.min} times per week</p>
      )}
      {!saved && <button onClick={handleSavePlant}>Save to your garden!</button>}
      {saved && <p>Plant saved to your garden!</p>}
      </div>
    </div>
  );

};

export default PlantCard;
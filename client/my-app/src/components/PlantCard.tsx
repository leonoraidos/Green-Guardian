import { FC } from "react";
import { PlantCardProps } from "../types/plant";

const PlantCard: FC<PlantCardProps> = ({plantInfo}) => {

  if (!plantInfo) {
    return null;
  }

  const savePlant = async () => {

    const res = await fetch('http://localhost:3001/saveplant', {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({plantInfo})
    })
      const data = await res.json();
      console.log(data);

  }

  return (
    <div className="plantIDCard">
      <h2>{plantInfo.plant_name}</h2>
      <button onClick={savePlant}>Save to your garden!</button>
    </div>
  )
}

export default PlantCard;
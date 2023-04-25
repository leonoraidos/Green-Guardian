import { FC, useState } from "react";
import { IPlantInfo } from "../types/plant";
import plantAPI from "../utils/PlantApi";
import { userToken } from "../firebase";


interface waterAlertProps {
  plantInfo: IPlantInfo,
}

const WaterButton: FC<waterAlertProps> = ({plantInfo}) => {

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const accessToken = localStorage.getItem('accessToken');

  const toggleAlerts = async () => {
    setIsChecked(!isChecked);
    if(!isChecked) {
      if (accessToken !== null && userToken !== null) {
            try {
              await plantAPI.alert(plantInfo, accessToken, userToken);;
              console.log('Alerts set for: ', plantInfo.plant_name);
            } catch (err) {
              console.log(err);
              //skeleton error handling, needs improvement
              return (
                <p>Unable to save plant. Please try again later.</p>
              )
            }
      }
    } else {
      console.log('Already has alerts set');
    }
  }




  return (
    <label className="waterLabel">
      <strong>Watering alerts?</strong>
      <input className="waterButton" type="checkbox" checked={isChecked} onChange={toggleAlerts} />
      <span />
    </label>
  )
}

export default WaterButton;
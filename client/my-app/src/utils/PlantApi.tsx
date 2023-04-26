import { IPlantInfo } from "../types/plant";

//NEEDS REACT_APP TO ANY ENV VAR 
const SERVER_URL = process.env.REACT_APP_API_URL;

const plantAPI = {

  async savePlant (plantInfo: IPlantInfo, accessToken: string) {
    return await fetch(`${SERVER_URL}/saveplant`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({plantInfo})
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  async garden(accessToken: string) {
    return fetch(`${SERVER_URL}/myguarden`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  async alert(plantInfo: IPlantInfo, accessToken: string, userToken: string) {
    return fetch(`${SERVER_URL}/setalert`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({plantInfo, userToken})
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
}

export default plantAPI;
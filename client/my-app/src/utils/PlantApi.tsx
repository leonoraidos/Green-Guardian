import { IPlantInfo } from "../types/plant";

const SERVER_URL = 'http://localhost:3001';

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
  }

}

export default plantAPI;
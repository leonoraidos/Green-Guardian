import { User, LoginState } from '../types/user';

const SERVER_URL = process.env.REACT_APP_API_URL;

const serverAPI = {
  async register(user: User) {
    return fetch(`${SERVER_URL}/register`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  async login(user: LoginState) {
    console.log(user.email);
    console.log(`${SERVER_URL}/login`);
   return fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        //bellow here was an attemp to set up requests from phone to server but was unlucky
        //kept here for future ref and attempts
        "ngrok-skip-browser-warning": "true"
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log('line 28', res);
        return res})
      .then((res) => res.json())
      .catch((err) => console.log('API ERROR', err));
  },

  async profile(accessToken: string) {
    return fetch(`${SERVER_URL}/me`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        //bellow here was an attemp to set up requests from phone to server but was unlucky
        //kept here for future ref and attempts
        "ngrok-skip-browser-warning": "true",
      }
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }


}

export default serverAPI;
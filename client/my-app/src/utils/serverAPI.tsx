import { User, LoginState } from '../types/user';

const SERVER_URL = 'http://localhost:3001';

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
    return fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  async profile(accessToken: string) {
    return fetch(`${SERVER_URL}/me`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  
}

export default serverAPI;
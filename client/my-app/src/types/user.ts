export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ApiRes {
  message: string;
  data: {
    accessToken: string;
    user: User;
  }
}

export interface LoginState {
  email: string;
  password: string;
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import serverAPI from '../utils/UserAPI';
import { LoginState } from '../types/user';

const initialState = {
  email: '',
  password: '',
}

function Login() {
  let navigate = useNavigate();
  const [state, setState ] = useState(initialState);


  const validateForm = () => {
    return !state.email || !state.password;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic to send a request to API service /login
    const { email, password } = state;
    const user: LoginState = { email, password };
    const res = await serverAPI.login(user);

    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
      // This sets isAuthenticated = true and redirects to profile
      //props.setIsAuthenticated(true);
      //auth.login(() =>
      navigate('/profile');
    }


  };

  return (
    <div className="forms">
      <section>
        <h2 className="formTitle">Login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name@mail.com"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
          <button className="form-submit" type="submit" disabled={validateForm()}>
            &nbsp;Login&nbsp;
          </button>
        </form>
      </section>
      <h3>Not Registered? <Link to={`register`}>Register here</Link></h3>
    </div>
  );
}

export default Login;
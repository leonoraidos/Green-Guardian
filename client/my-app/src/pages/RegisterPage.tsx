import React, { useState } from 'react';
import serverAPI from '../utils/UserAPI';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};


const Register = () => {

  let navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const validateForm = () => {
    return (
      !state.email || !state.password || !state.firstName || !state.lastName
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = state;
    const user = { email, password, firstName, lastName };
    const res = await serverAPI.register(user);

    if (res.error) {
      //WILL ADD BETTER ERROR HANDLING
      alert(`${res.message}`);
      setState(initialState);
    } else {
      const {accessToken} = res;
      localStorage.setItem('accessToken', accessToken);
      navigate('/');
    }
  }

  return (
    <div className="forms">
      <section id="registerFormSection">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={state.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={state.lastName}
            onChange={handleChange}
          />
          <button className="form-submit" type="submit" disabled={validateForm()}>
            Register
          </button>
        </form>
      </section>
    </div>
  );
}

export default Register;
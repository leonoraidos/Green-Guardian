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
    console.log('line 22', e.target.value);

    const { name, value } = e.target;
    console.log('line 25', name, value);
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log('line 30')
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Line 31');
    const { email, password } = state;
    console.log('Line 33', email, password);
    const user: LoginState = { email, password };
    const res = await serverAPI.login(user);

    if (res.error) {
      //ADD BETTER ERROR HANDLING SO USER KNOWS
      alert(`${res.message}`);
      setState(initialState);

    } else {

      const { accessToken } = res;
      localStorage.setItem('accessToken', accessToken);
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
            Login
          </button>
        </form>
      </section>
      <h3>Not Registered? <Link to={`register`}>Register here</Link></h3>
    </div>
  );
}

export default Login;
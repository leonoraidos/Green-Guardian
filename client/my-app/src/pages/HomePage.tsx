import React from 'react';
import Login from './LoginPage';
//import Register from './RegisterPage'

function Home(): JSX.Element {
  return (
    <div>
      <h1>Home</h1>
      <Login />
    </div>
  );
}

export default Home;
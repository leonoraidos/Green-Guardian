//currently not in use but if possible will be the page user is redirected
//to be prompted to download the PWA/save to home screen

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
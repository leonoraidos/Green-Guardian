import {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage';
import NavBar from './components/NavBar';
import LogoBar from './components/LogoBar';
import WaterNotification from './components/WaterNotification';
import ErrorPage from './error-page';
import Register from './pages/RegisterPage';
import Profile from './pages/ProfilePage';
import PlantId from './pages/IdPlantPage';
import Alerts from './components/AlertList';
import './App.css';
import { getTokenWrapper } from './firebase';

function App() {

  const [isTokenFound, setTokenFound ] = useState(false);

  //when pages loads, gets connected to firebase and generates a client specific token 
  getTokenWrapper(setTokenFound);

  return (
    <div>
    {/* TODO: eventually this will have a protected route component to make the protected pages redirect the user back to login */}
      <div className="app-bg"></div>
        <BrowserRouter>
          <LogoBar />
          <WaterNotification />
          <div>
          {isTokenFound}
          </div>
          <Routes>
            <Route path='/' element={<Login />} errorElement={<ErrorPage />}/>
            <Route path="/register" element={<Register />} errorElement={<ErrorPage />}></Route>
            <Route path="/profile" element={<Profile />} ></Route>
            <Route path="/camera" element={<PlantId />}></Route>
            <Route path="/alerts" element={<Alerts />}></Route>
            <Route></Route>
          </Routes>
          <NavBar  />
        </BrowserRouter>

      </div>
  );
}

export default App;
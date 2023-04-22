//import {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage';
import NavBar from './components/NavBar';
import LogoBar from './components/LogoBar'
import ErrorPage from './error-page';
import Register from './pages/RegisterPage';
import Profile from './pages/ProfilePage';
import PlantId from './pages/IdPlantPage';
import Alerts from './components/AlertList';
import './App.css';

//eventually implement authentication for sure
//import auth from './utils/auth';

function App() {
  // const initialState = auth.isAuthenticated();
  // const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <div className="App" >
      <BrowserRouter>
        <LogoBar />
        <Routes>
          <Route path='/' element={<Login />} errorElement={<ErrorPage />}/>
          <Route path="/register" element={<Register />} errorElement={<ErrorPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
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
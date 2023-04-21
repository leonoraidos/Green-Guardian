import React  /*{ useState }*/  from 'react';
//import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import NavBar from './components/NavBar';
import './App.css';

//const auth = require('./utils/auth');

function App() {
  //const initialState = auth.isAuthenticated();
  //const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <div className="App" >
      <p>Hello World</p>
        {/* <Routes>
          <Route path='/home' element={<Home />}/>
        </Routes> */}
        <Login />
        <NavBar />
    </div>
  );
}

export default App;
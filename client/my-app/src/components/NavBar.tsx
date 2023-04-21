import { Link } from "react-router-dom";
import alert from '../assests/Picture2.1.png';
import profile from '../assests/Picture3.1.png';
import camera from '../assests/Picture4.png';

function NavBar() {
  return (
    <>
      <div className="navbar">
        <Link to={`profile`}><img src={profile} alt="Path to Profile Page" className="navicons"></img></Link>
        <Link to={`camera`}><img src={camera} alt="Path to Camera Page" className="navicons"></img></Link>
        <Link to={`alerts`}><img src={alert} alt="Path to Alerts Page" className="navicons"></img></Link>
      </div>
    </>

  )
}

export default NavBar;
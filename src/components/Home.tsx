
import { Link } from "react-router-dom";

function Home() {

  return (
    
    <div className="below-input-box head-text" id="welcome-message">
      Welcome to Random User Profile Generator. <Link to='/register'>Register</Link> to Create an Account.
      Or <Link to='/login'>Login</Link> to proceed to Application.
    </div>
  );
}

export default Home;
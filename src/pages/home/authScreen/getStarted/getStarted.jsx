import { Link } from "react-router-dom";
import InputAuthSignUp from "./InputAuthSignUp";

const GetStarted = () => {
  return (
    <div className="getStarted-outer-container d-flex justify-content-center">
      <div className="hero-bg getStartedContainer d-flex flex-column">
        <header className="d-flex justify-content-around align-items-center">
          <Link to="/">
            <img src="netflix-logo.png" alt="logo" className="netflix-header-noMargin" />
          </Link>

          <div></div>

          <Link to="/login" className="sign-in-button-authScreen">
            Sign In
          </Link>
        </header>

        <div className="main-input flex-grow-1 d-flex flex-column justify-content-center align-items-center gap-3">
          <h1>Unlimited movies, TV shows, and more</h1>
          
          <InputAuthSignUp />
        </div>
      </div>
    </div>
  )
}

export default GetStarted;
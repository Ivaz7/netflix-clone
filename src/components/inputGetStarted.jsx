import { Link } from "react-router-dom";

const InputGetStarted = () => {
  return (
    <div className="inputGetStartedContainer d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2" id="inputGetStartedContainer">
      <div className="form-floating">
        <input name="email" id="email" type="email" placeholder="Email address" className="input-get-started form-control" />

        <label htmlFor="email" className="input-label form-label">Email address</label>
      </div>

      <Link to="/signUp" className="getStartedButton d-flex justify-content-center align-items-center gap-3">
        Get Started
        <i className="fa-solid fa-chevron-right"></i></Link>
    </div>
  );
}

export default InputGetStarted;
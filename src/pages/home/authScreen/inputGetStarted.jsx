import { Link } from "react-router-dom";
import InputForm from "../../../components/inputForm";

const InputGetStarted = () => {
  return (
    <div className="inputGetStartedContainer d-flex flex-column flex-md-row justify-content-center gap-2" id="inputGetStartedContainer">
      <div className="flex-grow-1">
        <InputForm 
          name="email"
          type="email"
          placeholder="Email Address"
          warning="Please enter a valid email."
        />
      </div>

      <Link to="/signUp" className="getStartedButton align-self-center d-flex justify-content-center align-items-center gap-3">
        Get Started
        <i className="fa-solid fa-chevron-right"></i>
      </Link>
    </div>
  );
}

export default InputGetStarted;
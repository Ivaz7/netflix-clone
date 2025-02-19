import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSignUpEmail } from "../../../service/redux/slice/signUpEmailSlice";

const InputGetStarted = () => {
  const email = useSelector((state) => state.signUpEmail.email);
  const dispatch = useDispatch();

  const [emailStatus, setEmailStatus] = useState(false);

  const validationEmail = (value) => /\S+@\S+\.\S+/.test(value);

  return (
    <div className="inputGetStartedContainer d-flex flex-column flex-md-row justify-content-center align-items-center gap-2" id="inputGetStartedContainer">
      <div className="form-floating">
        <input 
          name="email" 
          id="email" 
          type="email" 
          placeholder="Email address" 
          value={email} 
          onChange={(e) => dispatch(setSignUpEmail(e.target.value))}
          onBlur={(e) => setEmailStatus(!validationEmail(e.target.value))}
          className={`input-get-started form-control ${emailStatus ? "notAllowed" : ""}`}
        />

        <p className={`input-warning input-allowed-${emailStatus ? "yes" : "not"}`}><i className="fa-regular fa-circle-xmark"></i> Email is required</p>

        <label htmlFor="email" className="input-label form-label">Email address</label>
      </div>

      <Link to="/signUp" className="getStartedButton d-flex justify-content-center align-items-center gap-3">
        Get Started
        <i className="fa-solid fa-chevron-right"></i>
      </Link>
    </div>
  );
}

export default InputGetStarted;
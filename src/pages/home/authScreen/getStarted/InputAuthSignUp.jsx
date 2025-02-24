import InputForm from "../../../../components/inputForm";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const InputAuthSignUp = () => {
  const email = useSelector((state) => state.signUpEmail.email);

  const navigate = useNavigate();

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const inputRef = useRef(null);
  const inputContainerRef = useRef(null);

  const [validation, setValidation] = useState({
    email: false,
  });

  const handleClick = () => {
    if (validateEmail(email)) {
      navigate("/signUP");
    } else {
      inputContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })

      const timeFocus = setTimeout(() => {
        inputRef.current.focus();
      }, 300)

      return () => clearTimeout(timeFocus);
    }
  }

  return (
    <div className="d-flex flex-column gap-2">
      <p>Ready to watch? Enter your email to create or restart your membership.</p>

      <div className="InputAuthSignUp d-flex flex-column flex-md-row justify-content-center gap-2" id="InputAuthSignUp">
        <div ref={inputContainerRef} className="input-div flex-grow-1">
          <InputForm 
            name="email"
            type="email"
            placeholder="Email Address"
            warning="Please enter a valid email."
            validation={validation}
            setValidation={setValidation}
            ref={inputRef}
          />
        </div>

        <button onClick={handleClick} className="getStartedButton align-self-center d-flex justify-content-center align-items-center gap-3">
          Get Started
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default InputAuthSignUp;
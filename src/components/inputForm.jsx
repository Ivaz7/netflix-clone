import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { setSignUpEmail } from '../service/redux/slice/signUpEmailSlice';
import { forwardRef, useState } from 'react';

const InputForm = forwardRef(({ name, type, placeholder, warning, password, setPassword, passwordConfirm, setPasswordConfirm,  validation, setValidation, handleFocusEmail, signInEmail, setSignInEmail, userName, setUserName, setWarning, arrayCheck, whiteVer }, ref) => {
  const email = useSelector((state) => state.signUpEmail.email);
  const dispatch = useDispatch();

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const UpValidatePassword = (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(value);
  const InValidatePassword = (value) => value.length > 0;
  const validatePasswordConfirm = (value) => value === password;
  const validateUserName = (value) => /^[a-zA-Z0-9]+$/.test(value);

  const [typePass, setTypePass] = useState(type);
  const pass = name === "password" || name === "passwordConfirm";

  let value = null;

  if (typeof signInEmail !== 'undefined') {
    value = signInEmail;
  } else {
    if (name === "email") {
      value = email;
    } else if (name === "password") {
      value = password;
    } else if (name === "passwordConfirm") {
      value = passwordConfirm;
    } else if (name === "userName") {
      value = userName
    }
  }
  
  const handlePass = (e) => {
    e.preventDefault();
    setTypePass(prev => prev === "password" ? "text" : "password");
  }

  const handleChange = (e) => {
    const value = e.target.value;

    if (name === "email") {
      if (signInEmail !== undefined) {
        setSignInEmail(value);
      } else {
        dispatch(setSignUpEmail(value));
      }
    }     

    if (name === "password") {
      return setPassword(value)
    }

    if (name === "passwordConfirm") {
      return setPasswordConfirm(value)
    }

    if (name === "userName") {
      return dispatch(setUserName(value))
    }
  }

  const handleBlur = () => {
    if (name === "email") {
      setValidation((prev) => (
        {
          ...prev,
          email: !validateEmail(value)
        }
      ))
    }

    if (name === "password" && signInEmail) {
      setValidation((prev) => (
        {
          ...prev,
          password: !InValidatePassword(password)
        }
      ))
    }

    if (name === "password" && !signInEmail) {
      setValidation((prev) => (
        {
          ...prev,
          password: !UpValidatePassword(password)
        }
      ))
    }

    if (name === "passwordConfirm") {
      setValidation((prev) => (
        {
          ...prev,
          passwordConfirm: !validatePasswordConfirm(passwordConfirm)
        }
      ))
    }

    if (name === "userName") {
      let isInvalid = false;
  
      if (userName.length < 1) {
        setWarning("Please enter a Name");
        isInvalid = true;
      } else if (arrayCheck.includes(userName)) {
        setWarning("This name is already in use. Select another name and try again.");
        isInvalid = true;
      } else if (!validateUserName(userName)) {
        setWarning("Please only using Letter and Number.");
        isInvalid = true;
      }
    
      setValidation((prev) => ({ ...prev, userName: isInvalid}));
    }
  }

  return (
    <>
      <div className={`form-floating ${whiteVer ? "whiteVer" : ""}`}>
        <input 
          autoComplete={`${typeof signInEmail !== 'undefined' || password ? 'on' : 'off'}`}
          name={name}
          id={name}
          type={pass ? typePass : type} 
          placeholder={placeholder} 
          value={value} 
          className={`form-control text-white ${
            typeof userName !== "undefined" && validation.userName !== undefined
              ? validation.userName 
                ? "not-allowed-userName" 
                : ""
              : validation[name] 
                ? "not-allowed" 
                : ""
          }`}                    
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          onFocus={handleFocusEmail}
          ref={ref}
        />

        {pass && <button onClick={handlePass} className='eye-button'>
          <i className={`fa-${typePass === "password" ? "regular" : "solid"} fa-eye`}></i>
        </button>}

        {typeof userName !== "undefined" && validation.userName !== undefined ? (
          <p className={`text-start input-warning input-allowed-${validation.userName ? "yes-userName" : "not"}`}>
            <i className="fa-solid fa-triangle-exclamation"></i> {warning}
          </p>
        ) : (
          <p className={`text-start input-warning input-allowed-${validation[name] ? "yes" : "not"}`}>
            <i className="fa-regular fa-circle-xmark"></i> {warning}
          </p>
        )}

        <label htmlFor={type}>{placeholder}</label>
      </div>
    </>
  )
})

InputForm.displayName = "InputForm";

InputForm.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  warning: PropTypes.string.isRequired,
  password: PropTypes.string,
  setPassword: PropTypes.func,
  passwordConfirm: PropTypes.string,
  setPasswordConfirm: PropTypes.func,
  validation: PropTypes.object,
  setValidation: PropTypes.func,
  handleFocusEmail: PropTypes.func,
  status: PropTypes.string,
  signInEmail: PropTypes.string,
  setSignInEmail: PropTypes.func,
  userName: PropTypes.string,
  setUserName: PropTypes.func,
  setWarning: PropTypes.func,
  arrayCheck: PropTypes.array,
  whiteVer: PropTypes.bool,
};


export default InputForm;

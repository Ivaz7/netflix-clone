import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setSignUpEmail } from '../service/redux/slice/signUpEmailSlice';

const InputForm = ({ name, type, placeholder, warning, handleFocusEmail }) => {
  const email = useSelector((state) => state.signUpEmail.email);
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validation, setValidation] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validatePassword = (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(value);
  const validatePasswordConfirm = (value) => value === password;

  let value = name === "email" 
              ? email
              : name === "password"
              ? password
              : passwordConfirm

  const handleChange = (e) => {
    const value = e.target.value;

    if (name === "email") {
      return dispatch(setSignUpEmail(value))
    }

    if (name === "password") {
      return setPassword(value)
    }

    if (name === "passwordConfirm") {
      return setPasswordConfirm(value)
    }
  }

  const handleBlur = () => {
    if (name === "email") {
      setValidation((prev) => (
        {
          ...prev,
          email: !validateEmail(email)
        }
      ))
    }

    if (name === "password") {
      setValidation((prev) => (
        {
          ...prev,
          password: !validatePassword(password)
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
  }

  return (
    <>
      <div className="form-floating">
        <input 
          autoComplete="off"
          name={name}
          id={name}
          type={type} 
          placeholder={placeholder} 
          value={value} 
          className={`form-control text-white ${validation[type] ? "not-allowed" : ""}`}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          onFocus={handleFocusEmail}
        />

        <p className={`input-warning input-allowed-${validation[type] ? "yes" : "not"}`}><i className="fa-regular fa-circle-xmark"></i> {warning}</p>

        <label htmlFor={type}>{placeholder}</label>
      </div>
    </>
  )
}

InputForm.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  warning: PropTypes.string.isRequired,
  handleFocusEmail: PropTypes.object.isRequired,
}

export default InputForm;

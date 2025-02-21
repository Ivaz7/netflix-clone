import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { setSignUpEmail } from '../service/redux/slice/signUpEmailSlice';

const InputForm = ({ name, type, placeholder, warning, password, setPassword, passwordConfirm, setPasswordConfirm,  validation, setValidation, handleFocusEmail, signInEmail, setSignInEmail }) => {
  const email = useSelector((state) => state.signUpEmail.email);
  const dispatch = useDispatch();

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const UpValidatePassword = (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(value);
  const InValidatePassword = (value) => value.length > 0;
  const validatePasswordConfirm = (value) => value === password;

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
    }
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
          className={`form-control text-white ${validation[name] ? "not-allowed" : ""}`}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          onFocus={handleFocusEmail}
        />

        <p className={`text-start input-warning input-allowed-${validation[name] ? "yes" : "not"}`}><i className="fa-regular fa-circle-xmark"></i> {warning}</p>

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
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  setPasswordConfirm: PropTypes.func.isRequired,
  validation: PropTypes.object.isRequired,
  setValidation: PropTypes.func.isRequired,
  handleFocusEmail: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  signInEmail: PropTypes.string.isRequired,
  setSignInEmail: PropTypes.func.isRequired,
};


export default InputForm;

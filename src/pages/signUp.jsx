import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
import { useSignUpUserMutation } from "../service/redux/API/fireBaseAuthSlice";
import InputForm from "../components/inputForm";
import { useGetLoginStatusQuery } from "../service/redux/API/firebaseDB";

const SignUp = () => {
  const email = useSelector((state) => state.signUpEmail.email);
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validation, setValidation] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
  });

  const emailCheckTimeOutRef = useRef(null);
  
  const [signUpUser, { isLoading, error, reset }] = useSignUpUserMutation();
  const { data: dataIsLogin, isLoading: isLoadingGetData } = useGetLoginStatusQuery();

  useEffect(() => {
    if (dataIsLogin) {
      navigate("/")
    }
  }, [dataIsLogin, navigate])

  if (dataIsLogin) {
    return;
  }
  
  if (isLoading || isLoadingGetData) {
    return <div>Loading ... </div>;
  }

  if (error) {
    alert(error);
    reset();
  }
  
  const handleFocusEmail = () => {
    if (emailCheckTimeOutRef.current) {
      clearTimeout(emailCheckTimeOutRef.current);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password || !passwordConfirm) {
      alert("Please fill all fields!");
      return;
    }
  
    try {
      await signUpUser({ email, password }).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      alert(err.message);
    }
  };

  return (
    <div className="outerForm-container">
      <div className="hero-bg d-flex flex-column gap-3">
        <header>
          <Link to={"/"}>
            <img src="netflix-logo.png" alt="logo" className="netflix-header" />
          </Link>
        </header>

        <main className="d-flex flex-column justify-content-center align-items-center">
          <div className="form-container d-flex flex-column gap-2 rounded">
            <h2 className="text-white mb-3">Sign Up</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center gap-3">
              <InputForm 
                name="email"
                type="email"
                placeholder="Email Address"
                warning="Please enter a valid email."
                handleFocusEmail={handleFocusEmail}
                validation={validation}
                setValidation={setValidation}
              />

              <InputForm 
                name="password"
                type="password"
                placeholder="Password"
                warning="Please enter 6 to 20 characters with at least one number and one letter."
                password={password}
                setPassword={setPassword}
                validation={validation}
                setValidation={setValidation}
              />

              <InputForm 
                name="passwordConfirm"
                type="password"
                placeholder="Confirm Password"
                warning="Your password does not match."
                password={password}
                passwordConfirm={passwordConfirm}
                setPasswordConfirm={setPasswordConfirm}
                validation={validation}
                setValidation={setValidation}
              />
              
              <button type="submit" className="mb-4 w-100 rounded p-2">Sign Up</button>

              <div className="d-flex justify-content-center align-items-center gap-2">
                <label>Already have an account?</label> 
                <Link to="/login" className="m-0">Sign In</Link>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;

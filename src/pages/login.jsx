import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/footer";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    emailOrUsername: false,
    password: false,
  });

  const handleBlur = (field, value) => {
    setValidation((prev) => ({
      ...prev,
      [field]: field === "emailOrUsername"
        ? !validateEmailOrUsername(value)
        : !validatePassword(value),
    }));
  };

  const validateEmailOrUsername = (value) => value.length > 1;
  const validatePassword = (value) => value.length > 1;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailOrUsername, password);
  };

  return (
    <div className="w-100 h-100">
      <div className="hero-bg w-100 h-100 d-flex flex-column gap-3">
        <header>
          <Link to="/">
            <img src="netflix-logo.png" alt="logo" className="netflix-header-without-position" />
          </Link>
        </header>
  
        <main className="d-flex flex-column justify-content-center align-items-center">
          <div className="form-container p-5 d-flex flex-column gap-2 rounded">
            <h2 className="text-white mb-3">Sign In</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 form-floating">
                <input
                  name="emailOrUsername"
                  type="text"
                  id="emailOrUsername"
                  placeholder="Username Or Email"
                  className={`form-control text-white ${validation.emailOrUsername ? "not-allowed" : ""}`}
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  onBlur={(e) => handleBlur("emailOrUsername", e.target.value)}
                />
  
                <label htmlFor="emailOrUsername" className="form-label mb-1 text-white">Username Or Email</label>
  
                <p className={`mt-2 input-allowed-${validation.emailOrUsername ? "yes" : "not"}`}>
                  <i className="fa-regular fa-circle-xmark"></i> Please enter your email or username.
                </p>
              </div>
              <div className="mb-4 form-floating">
                <input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                  className={`form-control text-white ${validation.password ? "not-allowed" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => handleBlur("password", e.target.value)}
                />
  
                <label htmlFor="password" className="form-label mb-1 text-white">Password</label>
  
                <p className={`mt-2 input-allowed-${validation.password ? "yes" : "not"}`}>
                  <i className="fa-regular fa-circle-xmark"></i> Please enter your password.
                </p>
              </div>
              <button type="submit" className="mb-4 w-100 rounded p-2">Sign In</button>
              <div className="d-flex justify-content-center gap-2">
                <label>Don&apos;t have an Account?</label>
                <Link to="/signUp" className="m-0">Sign Up</Link>
              </div>
            </form>
          </div>
        </main>
      </div>
  
      <Footer />
    </div>
  );
};

export default Login;

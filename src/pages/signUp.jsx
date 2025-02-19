import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/footer";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validation, setValidation] = useState({
    email: false,
    username: false,
    password: false,
    passwordConfirm: false,
  });

  const handleBlur = (field, value) => {
    setValidation((prev) => ({
      ...prev,
      [field]: field === "email"
        ? !validateEmail(value)
        : field === "username"
        ? !validateUsername(value)
        : field === "password"
        ? !validatePassword(value)
        : !validatePasswordConfirm(value)
    }));
  };
  

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validateUsername = (value) => value.length > 3;
  const validatePassword = (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,10}$/.test(value);
  const validatePasswordConfirm = (value) => value === password;
  
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, username, password, passwordConfirm);
  }

  return (
    <div className="outerForm-container">
      <div className="hero-bg d-flex flex-column gap-3">
        <header>
          <Link to={"/"}>
            <img src="netflix-logo.png" alt="logo" className="netflix-header-without-position" />
          </Link>
        </header>

        <main className="d-flex flex-column justify-content-center align-items-center">
          <div className="form-container p-5 d-flex flex-column gap-2 rounded">
            <h2 className="text-white mb-3">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 form-floating">
                <input 
                  name="email" 
                  type="email" 
                  id="email" 
                  placeholder="Email address" 
                  className={`form-control text-white ${validation.email ? "not-allowed" : ""}`} 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  onBlur={e => handleBlur("email", e.target.value)}
                />

                <label htmlFor="email" className="form-label mb-1 text-white">Email address</label>

                <p className={`mt-2 input-allowed-${validation.email ? "yes" : "not"}`}><i className="fa-regular fa-circle-xmark"></i> Please enter a valid email.</p>
              </div>
              <div className="mb-4 form-floating">
                <input 
                  name="username" 
                  type="text" 
                  id="username"   
                  placeholder="Username" 
                  className={`form-control text-white ${validation.username ? "not-allowed" : ""}`}  
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  onBlur={e => handleBlur("username", e.target.value)}
                />

                <label htmlFor="username" className="form-label mb-1 text-white">Username</label>

                <p className={`mt-2 input-allowed-${validation.username ? "yes" : "not"}`}><i className="fa-regular fa-circle-xmark"></i> Please enter a valid username with atleast 4 character.</p>
              </div>
              <div className="mb-4 form-floating">
                <input 
                  name="password" 
                  type="password" 
                  id="password"    
                  placeholder="Password" 
                  className={`form-control text-white ${validation.password ? "not-allowed" : ""}`}  
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  onBlur={e => handleBlur("password", e.target.value)}
                />

                <label htmlFor="password" className="form-label mb-1 text-white">Password</label>

                <p className={`mt-2 input-allowed-${validation.password ? "yes" : "not"}`}><i className="fa-regular fa-circle-xmark"></i> Please enter 4 to 10 characther atleast with number and letter.</p>
              </div>
              <div className="mb-4 form-floating">
                <input 
                  name="passwordConfirm" 
                  type="password" 
                  id="passwordConfirm" 
                  placeholder="Confirm Password" 
                  className={`form-control text-white ${validation.passwordConfirm ? "not-allowed" : ""}`}  
                  value={passwordConfirm} 
                  onChange={e => setPasswordConfirm(e.target.value)} 
                  onBlur={e => handleBlur("passwordConfirm", e.target.value)}
                />

                <label htmlFor="passwordConfirm" className="form-label mb-1 text-white">Confirm Password</label>

                <p className={`mt-2 input-allowed-${validation.passwordConfirm ? "yes" : "not"}`}><i className="fa-regular fa-circle-xmark"></i> Your password is not the same</p>
              </div>
              <button type="submit" className="mb-4 w-100 rounded p-2">Sign Up</button>
              <div className="d-flex justify-content-center gap-2">
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
}

export default SignUp;
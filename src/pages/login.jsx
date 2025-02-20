import { Link } from "react-router-dom";
import Footer from "../components/footer";
import InputForm from "../components/inputForm";
import { useState } from "react";

const Login = () => {
    const [signInEmail, setSignInEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({
      email: false,
      password: false,
    });
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    
    console.log(email, password);
  };

  return (
    <div className="outerForm-container">
      <div className="hero-bg d-flex flex-column gap-3">
        <header>
          <Link to="/">
            <img src="netflix-logo.png" alt="logo" className="netflix-header" />
          </Link>
        </header>
  
        <main className="d-flex flex-column justify-content-center align-items-center">
          <div className="form-container p-5 d-flex flex-column gap-2 rounded">
            <h2 className="text-white mb-3">Sign In</h2>
            <form onSubmit={handleSubmit}  className="d-flex flex-column justify-content-center gap-3">
              <InputForm 
                name="email"
                type="email"
                placeholder="Email Address"
                warning="Please enter a valid email."
                signInEmail={signInEmail}
                setSignInEmail={setSignInEmail}
                validation={validation}
                setValidation={setValidation}
              />

              <InputForm 
                name="password"
                type="password"
                placeholder="Password"
                warning="Please enter a password"
                password={password}
                setPassword={setPassword}
                validation={validation}
                setValidation={setValidation}
              />
              <button type="submit" className="w-100 rounded p-2">Sign In</button>

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

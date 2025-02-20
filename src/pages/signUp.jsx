import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpEmail } from "../service/redux/slice/signUpEmailSlice";
import { useSignUpUserMutation, useCheckEmailExistsQuery } from "../service/redux/API/fireBaseAuthSlice";

const SignUp = () => {
  const email = useSelector((state) => state.signUpEmail.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpUser, { isLoading, error, reset }] = useSignUpUserMutation();
  const { data: emailExists, refetch } = useCheckEmailExistsQuery(email, { skip: !email });

  useEffect(() => {
    if (email) {
      if (validateEmail(email)) {
        console.log(emailExists)
        refetch();
      }

      setValidation((prev) => ({
        ...prev,
        email: !validateEmail(email),
      }))
    } 
  }, [email, refetch, emailExists])

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validation, setValidation] = useState({
    email: false,
    username: false,
    password: false,
    passwordConfirm: false,
  });

  const handleBlur = (field, value) => {
    if (field === "email" && validateEmail(value)) {
      console.log(emailExists)
      refetch()
    }

    setValidation((prev) => ({
      ...prev,
      [field]: field === "email"
        ? !validateEmail(value)
        : field === "password"
        ? !validatePassword(value)
        : !validatePasswordConfirm(value)
    }));
  };
  

  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validatePassword = (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/.test(value);
  const validatePasswordConfirm = (value) => value === password;
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password, passwordConfirm);

    if (!email || !password || !passwordConfirm) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const result = await signUpUser({ email, password }).unwrap();
      console.log("Success:", result);
      navigate("/"); 
    } catch (err) {
      console.error("Signup failed:", err);
      alert(err.message); 
    }
  }

  if (isLoading) {
    return <div>Loading ... </div>
  }

  if (error) {
    alert(error)
    reset();
  }

  return (
    <div className="outerForm-container">
      <div className="hero-bg d-flex flex-column gap-3">
        <header>
          <Link to={"/"}>
            <img src="netflix-logo.png" alt="logo" className="netflix-header" />
          </Link>
        </header>

        <main className="d-flex flex-column justify-content-center align-items-center">
          <div className="form-container p-5 d-flex flex-column gap-2 rounded">
            <h2 className="text-white mb-3">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 form-floating">
                <input 
                  autoComplete="off"
                  name="email" 
                  type="email" 
                  id="email" 
                  placeholder="Email address" 
                  className={`form-control text-white ${validation.email ? "not-allowed" : ""}`} 
                  value={email} 
                  onChange={e => dispatch(setSignUpEmail(e.target.value))} 
                  onBlur={e => handleBlur("email", e.target.value)}
                />

                <label htmlFor="email" className="form-label mb-1 text-white">Email address</label>

                <p className={`mt-2 input-allowed-${validation.email ? "yes" : "not"}`}><i className="fa-regular fa-circle-xmark"></i> Please enter a valid email.</p>
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

                <p className={`mt-2 input-allowed-${validation.password ? "yes" : "not"}`}><i className="fa-regular fa-circle-xmark"></i> Please enter 6 to 20 characther atleast with number and letter.</p>
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
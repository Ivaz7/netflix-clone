import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import InputForm from "../components/inputForm";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "../service/redux/API/fireBaseAuthSlice";
import { useGetLoginStatusQuery, useSetDefaultDBMutation } from "../service/redux/API/firebaseDB";
import LoadingComp from "../components/loadingComp";
import UserTryExample from "../components/userTryExample";
import { useSelector } from "react-redux";

const Login = () => {
  const tryExample = useSelector((state) => state.tryExample.status);
  const navigate = useNavigate();
  
  const [signInEmail, setSignInEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState({
    email: false,
    password: false,
  });
  
  const [signInTrigger, { isLoading, error, reset }] = useLoginUserMutation()
  const [setDatabase, { error: databaseError }] = useSetDefaultDBMutation();

  const { data: dataIsLogin, isLoading: isLoadingIsLogin, refetch } = useGetLoginStatusQuery(undefined, { refetchOnFocus: true });

  useEffect(() => {
    if (dataIsLogin) {
      navigate("/")
    }
  }, [dataIsLogin, navigate])
  
  if (dataIsLogin) {
    return;
  }

  if (isLoading || isLoadingIsLogin) {
    return <LoadingComp />;
  }

  if (error) {
    alert(error);
    reset();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!signInEmail || !password) {
      alert("Please fill all fields!");
      return;
    }
    
    try {
      const result = await signInTrigger({ email: signInEmail, password: password }).unwrap();
      const data = await setDatabase({ email: result.email, userId: result.uid });
      if (data) {
        refetch();
        if (dataIsLogin) {
          navigate("/")
        }
      }
    } catch (e) {
      console.error("Signup failed:", e);
      console.error("Setdatabase failed:", databaseError);
    }
  };

  return (
    <div className="outerForm-container">
      {tryExample && <UserTryExample />}

      <div className="hero-bg d-flex flex-column gap-3">
        <header>
          <Link to="/">
            <img src="netflix-logo.png" alt="logo" className="netflix-header" />
          </Link>
        </header>
  
        <main className="d-flex flex-column justify-content-center align-items-center">
          <div className="form-container d-flex flex-column gap-2 rounded">
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
              <button type="submit" className="mb-4 w-100 rounded p-2">Sign In</button>

              <div className="d-flex justify-content-center align-items-center gap-2">
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

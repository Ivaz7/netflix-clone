import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailOrUsername = e.target.email.value;
    const password = e.target.password.value;

    console.log(emailOrUsername, password);
  }

  return (
    <div className="hero-bg w-100 h-100 d-flex flex-column gap-3">
      <header className="position-fixed top-0 start-0 w-100 d-flex justify-content-around align-items-center p-2">
        <Link to={"/"}>
          <img src="netflix-logo.png" alt="logo" className="netflix-header" />
        </Link>
        <div></div>
      </header>

      <main className="h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="form-container p-4 d-flex flex-column gap-2">
          <h4 className="text-white text-center mb-3">Login</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="emailOrUsername" className="form-label mb-1 text-white">Username Or Email</label>
              <input type="text" className="form-control text-white" id="emailOrUsername" placeholder="Your Username or Email" aria-describedby="usernameOrEmail" />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label mb-1 text-white">Password</label>
              <input type="password" className="form-control text-white" id="password" placeholder="*******" aria-describedby="password" />
            </div>
            <button type="submit" className="mb-2 mt-2 w-100 rounded">Log in</button>
            <div className="d-flex justify-content-center gap-2">
              <label>Don&#39;t have an Account?</label> 
              <a className="m-0"  href="/signUp">
                Sing Up
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
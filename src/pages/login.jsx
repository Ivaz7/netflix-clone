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
      <header className="position-fixed top-0 start-0 w-100 d-flex justify-content-around align-items-center p-3">
        <Link to={"/"}>
          <img src="netflix-logo.png" alt="logo" className="netflix-header" />
        </Link>
      </header>

      <main className="h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="form-container p-5 d-flex flex-column gap-2 rounded">
          <h2 className="text-white mb-3">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 form-floating">
              <input name="emailOrUsername" type="text" className="form-control text-white" id="emailOrUsername" placeholder="Username Or Email" aria-describedby="usernameOrEmail" />
              <label htmlFor="emailOrUsername" className="form-label mb-1 text-white">Username Or Email</label>
            </div>
            <div className="mb-4 form-floating">
              <input name="password" type="password" className="form-control text-white" id="password" placeholder="Password" aria-describedby="password" />
              <label htmlFor="password" className="form-label mb-1 text-white">Password</label>
            </div>
            <button type="submit" className="mb-4 w-100 rounded p-2">Sign In</button>
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
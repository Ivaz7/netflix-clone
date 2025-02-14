import { Link } from "react-router-dom";

const SignUp = () => {  
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;

    if (password !== passwordConfirm) {
      return;
    }

    console.log(email, username, password, passwordConfirm);
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
          <h2 className="text-white mb-3">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 form-floating">
              <input name="email" type="email" className="form-control text-white" id="email" placeholder="Email address" />
              <label htmlFor="email" className="form-label mb-1 text-white">Email address</label>
            </div>
            <div className="mb-4 form-floating">
              <input name="username" type="text" className="form-control text-white" id="username" placeholder="Username" />
              <label htmlFor="username" className="form-label mb-1 text-white">Username</label>
            </div>
            <div className="mb-4 form-floating">
              <input name="password" type="password" className="form-control text-white" id="password" placeholder="Password" />
              <label htmlFor="password" className="form-label mb-1 text-white">Password</label>
            </div>
            <div className="mb-4 form-floating">
              <input name="passwordConfirm" type="password" className="form-control text-white" id="passwordConfirm" placeholder="Confirm Password" />
              <label htmlFor="passwordConfirm" className="form-label mb-1 text-white">Confirm Password</label>
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
  );
}

export default SignUp;
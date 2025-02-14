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
      <header className="position-fixed top-0 start-0 w-100 d-flex justify-content-around align-items-center p-2">
        <Link to={"/"}>
          <img src="netflix-logo.png" alt="logo" className="netflix-header" />
        </Link>
        <div></div>
      </header>

      <main className="h-100 d-flex flex-column justify-content-center align-items-center">
        <div className="form-container p-4 d-flex flex-column gap-2">
          <h4 className="text-white text-center mb-3">Sign Up</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="email" className="form-label mb-1 text-white">Email address</label>
              <input type="email" className="form-control text-white" id="email" placeholder="you@example.com" aria-describedby="emailHelp" />
            </div>
            <div className="mb-2">
              <label htmlFor="username" className="form-label mb-1 text-white">Username</label>
              <input type="text" className="form-control text-white" id="username" placeholder="Your Nickname Example" aria-describedby="username" />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label mb-1 text-white">Password</label>
              <input type="password" className="form-control text-white" id="password" placeholder="*******" aria-describedby="password" />
            </div>
            <div className="mb-2">
              <label htmlFor="passwordConfirm" className="form-label mb-1 text-white">Password Confirmation</label>
              <input type="password" className="form-control text-white" id="passwordConfirm" placeholder="*******" aria-describedby="password confirmation" />
            </div>
            <button type="submit" className="mb-2 mt-2 w-100 rounded">Sign Up</button>
            <div className="d-flex justify-content-center gap-2">
              <label>Already sign up?</label> 
              <a className="m-0"  href="/login">
                Sing In
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
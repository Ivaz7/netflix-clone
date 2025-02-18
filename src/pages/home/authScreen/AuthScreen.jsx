import { Link } from "react-router-dom";
import InputGetStarted from "./inputGetStarted";
import DemoSection from "./demoSection/demoSection";
import QAndAsection from "./Q&Asection/qAndAsection";

const AuthScreen = () => {
  return (
    <div className="authScreen position-relative w-100 h-100">
      <header className="position-absoulte top-0 start-0 w-100 h-0 d-flex justify-content-around align-items-center">
        <Link to="/">
          <img src="netflix-logo.png" alt="logo" className="netflix-header" />
        </Link>

        <Link to="/login" className="sign-in-button-authScreen">
          Sign In
        </Link>
      </header>

      <div className="getStartedContainer hero-bg w-100 h-100 d-flex flex-column justify-content-center align-items-center gap-3">
        <h1>Unlimited movies, TV shows, and more</h1>

        <p>Ready to watch? Enter your email to create or restart your membership.</p>

        <InputGetStarted />
      </div>

      <main className="d-flex flex-column justify-content-center align-items-center gap-5 mb-5">
        <DemoSection />
        <QAndAsection />

        <div className="d-flex flex-column gap-2">
          <p>Ready to watch? Enter your email to create or restart your membership.</p>
  
          <InputGetStarted />
        </div>
      </main>
    </div>
  );
}

export default AuthScreen;
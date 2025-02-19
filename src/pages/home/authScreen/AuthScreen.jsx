import { Link } from "react-router-dom";
import InputGetStarted from "./inputGetStarted";
import DemoSection from "./demoSection/demoSection";
import QAndAsection from "./Q&Asection/qAndAsection";
import Footer from "../../../components/footer";

const AuthScreen = () => {
  return (
    <div className="outer-authScreen">
      <div className="authScreen">
        <div className="getStarted-outer-container d-flex justify-content-center">
          <div className="hero-bg getStartedContainer d-flex flex-column">
            <header className="d-flex justify-content-around align-items-center">
              <Link to="/">
                <img src="netflix-logo.png" alt="logo" className="netflix-header-noMargin" />
              </Link>

              <div></div>

              <Link to="/login" className="sign-in-button-authScreen">
                Sign In
              </Link>
            </header>

            <div className="main-input flex-grow-1 d-flex flex-column justify-content-center align-items-center gap-3">
              <h1>Unlimited movies, TV shows, and more</h1>

              <p>Ready to watch? Enter your email to create or restart your membership.</p>

              <InputGetStarted />
            </div>
          </div>
        </div>

        <main className="d-flex flex-column justify-content-center align-items-center gap-4 gap-lg-5">
          <DemoSection />
          <QAndAsection />

          <div className="d-flex flex-column gap-3">
            <p>Ready to watch? Enter your email to create or restart your membership.</p>
    
            <InputGetStarted />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AuthScreen;
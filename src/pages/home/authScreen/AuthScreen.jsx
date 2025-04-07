import InputAuthSignUp from "./getStarted/InputAuthSignUp";
import DemoSection from "./demoSection/demoSection";
import QAndAsection from "./Q&Asection/qAndAsection";
import Footer from "../../../components/footer";
import GetStarted from "./getStarted/getStarted";
import UserTryExample from "../../../components/userTryExample";
import { useSelector } from "react-redux";

const AuthScreen = () => {
  const tryExample = useSelector((state) => state.tryExample.status);

  return (
    <div className="outer-authScreen">
      <div className="authScreen">
        {tryExample && <UserTryExample />}
        <GetStarted />

        <main className="d-flex flex-column justify-content-center align-items-center gap-4 gap-lg-5">
          <DemoSection />
          <QAndAsection />    
          <InputAuthSignUp />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default AuthScreen;
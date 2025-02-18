import DemoDevice from "./demoDevice";
import DemoDownload from "./demoDownload";
import DemoProfile from "./demoProfile";
import DemoVideo from "./demoVideo";

const DemoSection = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-5">
      <DemoVideo />
      <DemoDownload />
      <DemoDevice />
      <DemoProfile />
    </div>
  );
}

export default DemoSection;
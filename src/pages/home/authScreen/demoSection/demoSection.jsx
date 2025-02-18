import DemoDevice from "./demoDevice";
import DemoDownload from "./demoDownload";
import DemoVideo from "./demoVideo";

const DemoSection = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-5">
      <DemoVideo />
      <DemoDownload />
      <DemoDevice />
    </div>
  );
}

export default DemoSection;
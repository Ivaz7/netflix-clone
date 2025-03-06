import HeaderHome from "./header/headerHome";
import Footer from "../../../../components/footer";
import MainSlider from "../../../../components/mainSlider";

const HomeScreen = () => {
  // dummy test
  const imageUrls = [
    "https://picsum.photos/400/210?random=1",
    "https://picsum.photos/400/210?random=2",
    "https://picsum.photos/400/210?random=3",
    "https://picsum.photos/400/210?random=4",
    "https://picsum.photos/400/210?random=5",
    "https://picsum.photos/400/210?random=6",
    "https://picsum.photos/400/210?random=7",
    "https://picsum.photos/400/210?random=8",
    "https://picsum.photos/400/210?random=9",
    "https://picsum.photos/400/210?random=10",
    "https://picsum.photos/400/210?random=11",
    "https://picsum.photos/400/210?random=12",
    "https://picsum.photos/400/210?random=13",
    "https://picsum.photos/400/210?random=14",
    "https://picsum.photos/400/210?random=15",
    "https://picsum.photos/400/210?random=16",
    "https://picsum.photos/400/210?random=17",
    "https://picsum.photos/400/210?random=18",
    "https://picsum.photos/400/210?random=19",
    "https://picsum.photos/400/210?random=20"
  ];    

  const renderImgURl = imageUrls.map((val, index) => (
    <button key={index}>
      <img src={val} alt="img" style={{ width: "100%", objectFit: "cover", borderRadius: "inherit" }} />
    </button>
  ))

  return (
    <>
      <HeaderHome />

      <main className="homeScreen">
        <MainSlider name={"Dummy Slide"}>
          {renderImgURl}
        </MainSlider>
      </main>

      <Footer />
    </>
  );
}

export default HomeScreen;
import HeaderHome from "./header/headerHome";
import Footer from "../../../../components/footer";
import MainSlider from "../../../../components/mainSlider";
import { useGetPopularMoviesQuery } from "../../../../service/redux/API/tmdbApiSlicee";
import CustomFloatingComp from "../../../../components/customFloatingComp";
import LoadingComp from "../../../../components/loadingComp";
import ImgPopUpComp from "../../../../components/imgPopUpComp";

const HomeScreen = () => {
  const { data, isLoading } = useGetPopularMoviesQuery();

  if (isLoading) {
    return (
      <CustomFloatingComp>
        <LoadingComp />
      </CustomFloatingComp>
    )
  }

  const { results } = data;
  const imgArray = results.map((val, index) => {
    return (
      <ImgPopUpComp data={val} index={index} key={index} />
    )
  })

  return (
    <div className="outerHomeScreen">
      <HeaderHome />

      <main className="homeScreen">
        <MainSlider name={"Dummy Slide"}>
          {imgArray}
        </MainSlider>
      </main>

      <Footer />
    </div>
  );
}

export default HomeScreen;
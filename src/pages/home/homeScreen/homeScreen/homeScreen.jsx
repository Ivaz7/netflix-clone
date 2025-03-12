import HeaderHome from "./header/headerHome";
import Footer from "../../../../components/footer";
import MainSlider from "../../../../components/mainSlider";
import { useLazyGetActionMoviesQuery } from "../../../../service/redux/API/tmdbApiSlicee";
import CustomFloatingComp from "../../../../components/customFloatingComp";
import LoadingComp from "../../../../components/loadingComp";
import ImgPopUpComp from "../../../../components/imgPopUpComp";
import { useGetDataQuery } from "../../../../service/redux/API/firebaseDB";
import { useEffect } from "react";
import WelcomeBanner from "./welcomeBanner";

const HomeScreen = () => {
  const [triggerFetch, { data: dataMovie, isLoading: isLoadingMovie }] = useLazyGetActionMoviesQuery();
  const { data: dataGet, isLoading: isLoadingDataGet } = useGetDataQuery();
  
  const userOptionSelected = dataGet?.userOption[dataGet?.userSelected];
  const { statusAge } = userOptionSelected;
  
  useEffect(() => {
    triggerFetch({ age: statusAge });
  }, [triggerFetch, statusAge]);
  
  
  if (isLoadingMovie || isLoadingDataGet) {
    return (
      <CustomFloatingComp>
        <LoadingComp />
      </CustomFloatingComp>
    )
  }

  const results = dataMovie?.results || [];
  const imgArray = results.map((val, index) => {
    return (
      <ImgPopUpComp data={val} index={index} key={index} />
    )
  })

  return (
    <div className="outerHomeScreen">
      <HeaderHome />

      <main className="homeScreen">
        <WelcomeBanner />

        <section className="homeScreen__slider">
          <MainSlider name={"Dummy Slide"}>
            {imgArray}
          </MainSlider>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default HomeScreen;
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import HeaderHome from "./header/headerHome";
import Footer from "../../../../components/footer";
import WelcomeBanner from "./welcomeBanner";
import GenreSlider from "./GenreSlider";
import GenreGrid from "./genreGrid";
import SecondHeader from "./secondHeader";
import MoreInfo from "./moreInfo/moreInfo";
import { useMoreInfo } from "../../../../customHooks/useMoreInfo";
import { 
  useLazyGetActionMoviesQuery, useLazyGetActionTVShowsQuery, 
  useLazyGetComedyMoviesQuery, useLazyGetComedyTVShowsQuery, 
  useLazyGetTrendingMoviesQuery, useLazyGetTopRatedMoviesQuery, 
  useLazyGetPopularMoviesQuery, useLazyGetPopularTVShowsQuery, 
  useLazyGetTopRatedTVShowsQuery, useLazyGetTrendingTVShowsQuery 
} from "../../../../service/redux/API/tmdbApiSlicee";

const HomeScreen = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const grid = searchParams.get("grid");
  const search = searchParams.get("search");
  const name = category === "tv" ? "Tv Shows" : "Movies";

  const [scrollY, setScrollY] = useState(0);
  const storedScrollY = useRef(0); 
  const { moreInfo, categoryMoreInfo } = useMoreInfo();

  useEffect(() => {
    const handleScroll = () => {
      if (!moreInfo && categoryMoreInfo) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [moreInfo, categoryMoreInfo]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";

    if (moreInfo && categoryMoreInfo) {
      storedScrollY.current = scrollY;
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      window.scrollTo({ top: storedScrollY.current, behavior: "auto" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [moreInfo, categoryMoreInfo]);


  return (
    <>
      {moreInfo && categoryMoreInfo && <MoreInfo />}

      <div
        style={{ top: moreInfo && categoryMoreInfo ? `-${storedScrollY.current}px` : undefined }}
        className={`outerHomeScreen ${moreInfo && categoryMoreInfo ? "moreInfoIsOn" : ""}`}
      >
        <HeaderHome />

        <main className="homeScreen">
          {(category === "tv" || category === "movie") && <SecondHeader name={name} />}
          
          {search ? (
            <GenreGrid name="search" />
          ) : grid === "on" ? (
            <GenreGrid name={category === "tv" ? "TV Shows" : "Movies"} />
          ) : category === "myList" ? (
            <GenreGrid name="My List" />
          ) : (
            <>
              <WelcomeBanner />

              <section className="homeScreen__slider d-flex flex-column-reverse gap-2">
                <GenreSlider name="Action" fetchMovie={useLazyGetActionMoviesQuery} fetchTV={useLazyGetActionTVShowsQuery} />
                <GenreSlider name="Comedy" fetchMovie={useLazyGetComedyMoviesQuery} fetchTV={useLazyGetComedyTVShowsQuery} />
                <GenreSlider name="Trending" fetchMovie={useLazyGetTrendingMoviesQuery} fetchTV={useLazyGetTrendingTVShowsQuery} />
                <GenreSlider name="Top Rated" fetchMovie={useLazyGetTopRatedMoviesQuery} fetchTV={useLazyGetTopRatedTVShowsQuery} />
                <GenreSlider name="Popular" fetchMovie={useLazyGetPopularMoviesQuery} fetchTV={useLazyGetPopularTVShowsQuery} />
              </section>
            </>
          )}

          <Footer />
        </main>
      </div>
    </>
  );
};

export default HomeScreen;

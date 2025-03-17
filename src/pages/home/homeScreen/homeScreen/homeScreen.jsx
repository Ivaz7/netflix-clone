import HeaderHome from "./header/headerHome";
import Footer from "../../../../components/footer";
import WelcomeBanner from "./welcomeBanner";
import GenreSlider from "./GenreSlider";
import { useLazyGetActionMoviesQuery, useLazyGetActionTVShowsQuery, useLazyGetComedyMoviesQuery, useLazyGetComedyTVShowsQuery, useLazyGetTrendingMoviesQuery, useLazyGetTopRatedMoviesQuery, useLazyGetPopularMoviesQuery, useLazyGetPopularTVShowsQuery, useLazyGetTopRatedTVShowsQuery, useLazyGetTrendingTVShowsQuery } from "../../../../service/redux/API/tmdbApiSlicee";
import { useSearchParams } from "react-router-dom";
import GenreGrid from "./genreGrid";
import SecondHeader from "./secondHeader";
import { useMoreInfo } from "../../../../customHooks/useMoreInfo";
import MoreInfo from "./moreInfo";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const grid = searchParams.get("grid");
  const name = category === "tv" ? "Tv Shows" : "Movies";
  const search = searchParams.get("search");
  
  const [storedScrollY, setStoredScrollY] = useState(0);
  const { moreInfo } = useMoreInfo();

  useEffect(() => {
    // Nonaktifkan properti CSS smooth scroll sementara
    document.documentElement.style.scrollBehavior = "auto";
  
    if (moreInfo) {
      setStoredScrollY(window.scrollY);
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      window.scrollTo({ top: storedScrollY, behavior: "auto" });
    }
  }, [moreInfo, storedScrollY]);
   
  
  return (
    <>
      {moreInfo && <MoreInfo />}

      <div
        style={{ top: moreInfo ? `-${storedScrollY}px` : undefined }}
        className={`outerHomeScreen ${moreInfo ? "moreInfoIsOn" : ""}`}
      >
        <HeaderHome />

        <main className="homeScreen">
          {category === "tv" || category === "movie" ? <SecondHeader name={name} /> : null}
          { search
            ? <GenreGrid name={"search"} />
            : (grid === "on"
              ? (category === "tv" ? <GenreGrid name={"TV Shows"}/> : <GenreGrid name={"Movies"}/>)
              : (category === "myList" 
                ? <GenreGrid name={"My List"} />
                : <>
                  <WelcomeBanner />

                  <section className="homeScreen__slider d-flex flex-column-reverse gap-2">
                    <GenreSlider name="Action" fetchMovie={useLazyGetActionMoviesQuery} fetchTV={useLazyGetActionTVShowsQuery} />
                    <GenreSlider name="Comedy" fetchMovie={useLazyGetComedyMoviesQuery} fetchTV={useLazyGetComedyTVShowsQuery} />
                    <GenreSlider name="Trending" fetchMovie={useLazyGetTrendingMoviesQuery} fetchTV={useLazyGetTrendingTVShowsQuery} />
                    <GenreSlider name="Top Rated" fetchMovie={useLazyGetTopRatedMoviesQuery} fetchTV={useLazyGetTopRatedTVShowsQuery} />
                    <GenreSlider name="Popular" fetchMovie={useLazyGetPopularMoviesQuery} fetchTV={useLazyGetPopularTVShowsQuery} />
                  </section>
                </>)
              )
          }

          <Footer />
        </main>
      </div>
    </>
  );
};

export default HomeScreen;

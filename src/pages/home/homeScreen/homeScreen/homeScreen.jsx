import HeaderHome from "./header/headerHome";
import Footer from "../../../../components/footer";
import WelcomeBanner from "./welcomeBanner";
import GenreSlider from "./GenreSlider";
import { useLazyGetActionMoviesQuery, useLazyGetActionTVShowsQuery, useLazyGetComedyMoviesQuery, useLazyGetComedyTVShowsQuery, useLazyGetTrendingMoviesQuery, useLazyGetTopRatedMoviesQuery, useLazyGetPopularMoviesQuery, useLazyGetPopularTVShowsQuery, useLazyGetTopRatedTVShowsQuery, useLazyGetTrendingTVShowsQuery } from "../../../../service/redux/API/tmdbApiSlicee";
import { useSearchParams } from "react-router-dom";
import GenreGrid from "./genreGrid";
import SecondHeader from "./secondHeader";

const HomeScreen = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const name = category === "tv" ? "Tv Shows" : "Movies";

  return (
    <div className="outerHomeScreen">
      <HeaderHome />

      <main className="homeScreen">
        { category === "myList" 
          ? <GenreGrid name={"My List"} />
          : <>
            {category === "tv" || category === "movie" ? <SecondHeader name={name} /> : null}
            <WelcomeBanner />

            <section className="homeScreen__slider d-flex flex-column-reverse gap-2">
              <GenreSlider name="Action" fetchMovie={useLazyGetActionMoviesQuery} fetchTV={useLazyGetActionTVShowsQuery} />
              <GenreSlider name="Comedy" fetchMovie={useLazyGetComedyMoviesQuery} fetchTV={useLazyGetComedyTVShowsQuery} />
              <GenreSlider name="Trending" fetchMovie={useLazyGetTrendingMoviesQuery} fetchTV={useLazyGetTrendingTVShowsQuery} />
              <GenreSlider name="Top Rated" fetchMovie={useLazyGetTopRatedMoviesQuery} fetchTV={useLazyGetTopRatedTVShowsQuery} />
              <GenreSlider name="Popular" fetchMovie={useLazyGetPopularMoviesQuery} fetchTV={useLazyGetPopularTVShowsQuery} />
            </section>
          </>
        }

        <Footer />
      </main>
    </div>
  );
};

export default HomeScreen;

import HeaderHome from "./header/headerHome";
import Footer from "../../../../components/footer";
import WelcomeBanner from "./welcomeBanner";
import GenreSlider from "./GenreSlider";
import { useLazyGetActionMoviesQuery, useLazyGetActionTVShowsQuery, useLazyGetComedyMoviesQuery, useLazyGetComedyTVShowsQuery, useLazyGetTrendingMoviesQuery, useLazyGetTopRatedMoviesQuery, useLazyGetPopularMoviesQuery, useLazyGetPopularTVShowsQuery, useLazyGetTopRatedTVShowsQuery, useLazyGetTrendingTVShowsQuery } from "../../../../service/redux/API/tmdbApiSlicee";

const HomeScreen = () => {
  return (
    <div className="outerHomeScreen">
      <HeaderHome />
      <main className="homeScreen">
        <WelcomeBanner />
        <section className="homeScreen__slider d-flex flex-column gap-2">
          <GenreSlider name="Popular" fetchMovie={useLazyGetPopularMoviesQuery} fetchTV={useLazyGetPopularTVShowsQuery} />
          <GenreSlider name="Top Rated" fetchMovie={useLazyGetTopRatedMoviesQuery} fetchTV={useLazyGetTopRatedTVShowsQuery} />
          <GenreSlider name="Trending" fetchMovie={useLazyGetTrendingMoviesQuery} fetchTV={useLazyGetTrendingTVShowsQuery} />
          <GenreSlider name="Comedy" fetchMovie={useLazyGetComedyMoviesQuery} fetchTV={useLazyGetComedyTVShowsQuery} />
          <GenreSlider name="Action" fetchMovie={useLazyGetActionMoviesQuery} fetchTV={useLazyGetActionTVShowsQuery} />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default HomeScreen;

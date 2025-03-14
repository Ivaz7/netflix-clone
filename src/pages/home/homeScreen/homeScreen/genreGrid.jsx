import PropTypes from "prop-types";
import ImgPopUpComp from "../../../../components/imgPopUpComp";
import { useGetDataQuery } from "../../../../service/redux/API/firebaseDB";
import GridSystemDisplay from "./gridDisplay";
import SecondHeader from "./secondHeader";
import { 
  useGetPopularMoviesQuery, 
  useGetTopRatedMoviesQuery, 
  useGetTrendingMoviesQuery, 
  useGetActionMoviesQuery, 
  useGetComedyMoviesQuery, 
  useGetPopularTVShowsQuery, 
  useGetTopRatedTVShowsQuery, 
  useGetTrendingTVShowsQuery, 
  useGetActionTVShowsQuery, 
  useGetComedyTVShowsQuery 
} from "../../../../service/redux/API/tmdbApiSlicee";
import { useMemo } from "react";

const GenreGrid = ({ name }) => {
  const { data: dataGet } = useGetDataQuery();

  // Movies
  const { data: dataPopulerMovie } = useGetPopularMoviesQuery();
  const { data: dataTopRatedMovie } = useGetTopRatedMoviesQuery();
  const { data: dataTrendingMovie } = useGetTrendingMoviesQuery();
  const { data: dataActionMovie } = useGetActionMoviesQuery();
  const { data: dataComedyMovie } = useGetComedyMoviesQuery();
  
  // Data Results Movies
  const populerMovie = useMemo(() => (dataPopulerMovie?.results || []), [dataPopulerMovie]);
  const topRatedMovie = useMemo(() => (dataTopRatedMovie?.results || []), [dataTopRatedMovie]);
  const trendingMovie = useMemo(() => (dataTrendingMovie?.results || []), [dataTrendingMovie]);
  const actionMovie = useMemo(() => (dataActionMovie?.results || []), [dataActionMovie]);
  const comedyMovie = useMemo(() => (dataComedyMovie?.results || []), [dataComedyMovie]);
  
  // TV Shows
  const { data: dataPopulerTV } = useGetPopularTVShowsQuery();
  const { data: dataTopRatedTV } = useGetTopRatedTVShowsQuery();
  const { data: dataTrendingTV } = useGetTrendingTVShowsQuery();
  const { data: dataActionTV } = useGetActionTVShowsQuery();
  const { data: dataComedyTV } = useGetComedyTVShowsQuery();
  
  // Data Results TV Shows
  const populerTv = useMemo(() => (dataPopulerTV?.results || []), [dataPopulerTV]);
  const topRatedTv = useMemo(() => (dataTopRatedTV?.results || []), [dataTopRatedTV]);
  const trendingTv = useMemo(() => (dataTrendingTV?.results || []), [dataTrendingTV]);
  const actionTv = useMemo(() => (dataActionTV?.results || []), [dataActionTV]);
  const comedyTv = useMemo(() => (dataComedyTV?.results || []), [dataComedyTV]);
  
  // Final data
  const movieData = useMemo(() => {
    return [...populerMovie, ...topRatedMovie, ...trendingMovie, ...actionMovie, ...comedyMovie].sort(() => Math.random() - 0.5);
  }, [populerMovie, topRatedMovie, trendingMovie, actionMovie, comedyMovie]);
  
  const tvData = useMemo(() => {
    return [...populerTv, ...topRatedTv, ...trendingTv, ...actionTv, ...comedyTv].sort(() => Math.random() - 0.5);
  }, [populerTv, topRatedTv, trendingTv, actionTv, comedyTv]);
  
  const userOptionSelected = dataGet?.userOption[dataGet?.userSelected];
  const myList = userOptionSelected?.myList;
  
  let finalValue;
  
  if (name === "My List") {
    finalValue = myList;
  } else if (name === "TV Shows") {
    finalValue = tvData;
  } else if (name === "Movies") {
    finalValue = movieData;
  }
    
  const renderFinal = finalValue.map((val, index) => (
    <ImgPopUpComp data={val} key={index} />
  ));
  
  return (
    <div className="genreGrid d-flex flex-column">
      <SecondHeader name={name} />
      <GridSystemDisplay array={renderFinal} />
    </div>
  );
};

GenreGrid.propTypes = {
  name: PropTypes.string,
};

export default GenreGrid;

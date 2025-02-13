import { useEffect } from "react";
import { useGetPopularMoviesQuery } from "../service/redux/API/tmdbApiSlicee.js";
import { useDispatch } from "react-redux";
import { setPopularMovies } from "../service/redux/slice/movieData.js";
import { Link } from "react-router-dom";

const SignUp = () => {  
  const { data, isLoading, isError } = useGetPopularMoviesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setPopularMovies(data.results));
    }
  }, [dispatch, data]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (
      <div>
        <div>Something went wrong...</div>
      </div>
    );
  };

  console.log(data);

  return (
    <div className="hero-bg w-100 h-100">
      <header className="d-flex justify-content-around align-items-center p-3">
        <Link to={"/"}>
          <img src="netflix-logo.png" alt="logo" className="netflix-header" />
        </Link>
        <div></div>
      </header>
    </div>
  );
}

export default SignUp;
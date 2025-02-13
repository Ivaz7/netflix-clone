import { useEffect } from "react";
import { useGetPopularMoviesQuery } from "../service/redux/API/tmdbApiSlicee.js";
import { useDispatch } from "react-redux";
import { setPopularMovies } from "../service/redux/slice/movieData.js";

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
    <main>
    
    </main>
  );
}

export default SignUp;
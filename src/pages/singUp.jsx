import { useEffect } from "react";
import { useGetPopularMoviesQuery } from "../service/redux/API/tmdbApiSlicee.js";
import { useDispatch } from "react-redux";
import { setPopulerMovie } from "../service/redux/slice/movieData.js";

const SignUp = () => {  
  const { data, isLoading, isError, reset } = useGetPopularMoviesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setPopulerMovie(data.results));
    }
  }, [dispatch, data]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (
      <div>
        <div>Something went wrong...</div>
        <button onClick={() => reset()}>Try again</button>
      </div>
    );
  };

  console.log(data);

  return (
    <>
    
    </>
  );
}

export default SignUp;
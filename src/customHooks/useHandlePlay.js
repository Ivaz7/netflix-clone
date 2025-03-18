import { useNavigate } from "react-router-dom";
import { useLazyGetTrailerQuery } from "../service/redux/API/tmdbApiSlicee";
import { useEffect } from "react";

const useHandlePlay = () => {
  const [triggerTrailer, { data }] = useLazyGetTrailerQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const key = data?.results[0]?.key;
      navigate(`/watch?key=${key}`);
    }
  }, [data, navigate])

  const handlePlay = async (id, category) => {
    await triggerTrailer({ id, category });
  };

  return handlePlay;
};

export default useHandlePlay;

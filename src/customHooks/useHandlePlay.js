import { useNavigate } from "react-router-dom";
import { useLazyGetTrailerQuery } from "../service/redux/API/tmdbApiSlicee";
import { useEffect, useState } from "react";
import { useSetHistoryWatchedMutation } from "../service/redux/API/firebaseDB";

const useHandlePlay = () => {
  const [triggerTrailer, { data }] = useLazyGetTrailerQuery();
  const [triggerHistoryWatched] = useSetHistoryWatchedMutation();
  const navigate = useNavigate();
  
  const [currentShow, setCurrentShow] = useState({ id: null, showName: "", media_type: "" });

  useEffect(() => {
    if (data && currentShow.id) {
      const key = data?.results[0]?.key;
      const trailerName = data?.results[0]?.name;
      
      triggerHistoryWatched({ 
        id: currentShow.id, 
        showName: currentShow.showName, 
        key, 
        trailerName,
        media_type: currentShow.media_type, 
      });

      navigate(`/watch?key=${key}`);
    }
  }, [data, navigate, triggerHistoryWatched, currentShow]);

  const handlePlay = async (id, category, showName) => {
    setCurrentShow({ id, showName, media_type: category }); 
    await triggerTrailer({ id, category });
  };

  return handlePlay;
};

export default useHandlePlay;

import PropTypes from "prop-types";
import { useLazyGetLogosQuery } from "../../../../../service/redux/API/tmdbApiSlicee";
import { useEffect, useRef, useState } from "react";
import { useMoreInfo } from "../../../../../customHooks/useMoreInfo";
import { useGetDataQuery } from "../../../../../service/redux/API/firebaseDB";
import { motion, AnimatePresence } from "framer-motion";
import { useSetDeleteHistoryRatingMutation, useSetHitoryRatingMutation, useSetDeleteMyListMutation, useSetMyListMutation } from "../../../../../service/redux/API/firebaseDB";
import useHandlePlay from "../../../../../customHooks/useHandlePlay";

const HeaderMoreInfo = ({ dataDetail }) => {
  const { backdrop_path, id, genre_ids, poster_path, media_type, title, name } = dataDetail;
  const [triggerLogo, { data: dataLogo }] = useLazyGetLogosQuery();
  const { deleteMoreInfo } = useMoreInfo();
  const { data: dataGet, refetch } = useGetDataQuery();
  const handlePlay = useHandlePlay();

  useEffect(() => {
    if (id) {
      triggerLogo({ category: media_type, id: id })
    }
  }, [id, triggerLogo, media_type]);

  const [logo, setLogo] = useState(null);

  useEffect(() => {
    if (dataLogo) {
      setLogo(dataLogo.logos[0]?.file_path || null);
    }
  }, [dataLogo])

  const [isMylist, setMylist] = useState(false);
  const [isRating, setIsRating] = useState(false);
  const [ratingIndex, setRatingIndex] = useState(null);
  const timeOutRatingRef = useRef(null);
  const userOptionSelected = dataGet?.userOption[dataGet.userSelected];
  const { historyRating, myList } = userOptionSelected;

  const [triggerSetHistoryRating] = useSetHitoryRatingMutation();
  const [triggerSetMyList] = useSetMyListMutation();
  const [triggerSetDeleteHistoryRating] = useSetDeleteHistoryRatingMutation();
  const [triggerSetDeleteMyList] = useSetDeleteMyListMutation();

  const rated =
  historyRating !== "empty" && Array.isArray(historyRating)
    ? historyRating.find((val) => val.id === id) || null
    : null;

  useEffect(() => {
    if (myList !== "empty" && Array.isArray(myList)) {
      const exists = myList.some(item => item.id === id);
      setMylist(exists);
    } else {
      setMylist(false);
    }
  }, [myList, id]);

  useEffect(() => {
    if (rated && typeof rated.score === "number") {
      setRatingIndex(rated.score);
    } else {
      setRatingIndex(null);
    }
  }, [rated]);

  const buttonIcons = ["fa-thumbs-down", "fa-thumbs-up", "fa-heart"];

  const handleOptionRating = async (idx) => {
    if (ratingIndex === idx) {
      setRatingIndex(null);
    } else {
      setRatingIndex(idx);
    }
    setIsRating(false);

    if (idx !== null && (!rated || rated.score !== idx)) {
      await triggerSetHistoryRating({ id: id, score: idx, name: title || name, media_type });
      await refetch();
    } else if (ratingIndex === idx && rated) {
      await triggerSetDeleteHistoryRating({ id: id, name: title || name });
      await refetch();
    }
  };

  const renderRatingOption = buttonIcons.map((icon, idx) => {
    return (
      <button key={idx} onClick={() => handleOptionRating(idx)}>
        <i className={`fa-${ratingIndex === idx ? "solid" : "regular"} ${icon}`}></i>
      </button>
    );
  });


  const renderSelectedRating = (
    <button onMouseEnter={() => setIsRating(true)} onClick={() => setIsRating(true)}>
      <i
        className={`headerMoreInfo__details__userInteraction__ratingContainer__btnSelected fa-${
          ratingIndex !== null ? "solid" : "regular"
        } ${ratingIndex !== null ? buttonIcons[ratingIndex] : "fa-thumbs-up"}`}
      ></i>
    </button>
  );

  const handleLeaveRating = () => {
    timeOutRatingRef.current = setTimeout(() => {
      setIsRating(false);
    }, 250);
  };

  const handleEnterRating = () => {
    if (timeOutRatingRef.current) {
      clearTimeout(timeOutRatingRef.current);
    }
    setIsRating(true);
  };

  const handleMyList = async () => {
    const newMyListState = !isMylist;
    setMylist(newMyListState);
  
    if (newMyListState) {
      if (
        !myList ||
        myList === "empty" ||
        (Array.isArray(myList) && !myList.some((item) => item.id === id))
      ) {
        await triggerSetMyList({ id: id, poster_path: poster_path, genre_ids: genre_ids, title: title || name, media_type });
        await refetch();
      }
    } else {
      if (
        myList !== "empty" &&
        Array.isArray(myList) &&
        myList.some((item) => item.id === id)
      ) {
        console.log("test delete")
        await triggerSetDeleteMyList({ id: id, title: name || title });
        await refetch();
      }
    }
  };

  return (
    <header className="headerMoreInfo">
      {backdrop_path 
        ? <div className="headerMoreInfo__backdrop">
            <img className="headerMoreInfo__backdrop__img" src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt="backdrop" />
          </div>
        : <div className="headerMoreInfo__withoutBackdrop">{name || title}</div>
      }

      <div className="headerMoreInfo__details d-flex flex-column justify-content-between">
        <button onClick={() => deleteMoreInfo()} className="headerMoreInfo__details__cancelBtn d-flex justify-content-center align-items-center align-self-end">
          <i className="fa-solid fa-x"></i>
        </button>

        <div className="headerMoreInfo__details__userInteraction d-flex flex-column gap-3">
          {logo 
            ? <img className="headerMoreInfo__details__userInteraction__logo" src={`https://image.tmdb.org/t/p/original${logo}`} alt="backdrop" />
            : <h1 className="headerMoreInfo__details__userInteraction__logo__h1">{title || name}</h1>
          }

          <div className="headerMoreInfo__details__userInteraction__userBtn d-flex flex-row justify-content-start align-items-center gap-2">
            <button onClick={() => handlePlay(id, media_type, name || title)} className="headerMoreInfo__details__userInteraction__userBtn__play d-flex flex-row align-items-center gap-md-2 gap-1">
              <i className="fa-solid fa-play"></i>
              Play
            </button>

            <button onClick={handleMyList} className="headerMoreInfo__details__userInteraction__myListBtn">
              {isMylist 
                ? <i className="fa-solid fa-check"></i> 
                : <i className="fa-solid fa-plus"></i>
              }
            </button>

            <div className="headerMoreInfo__details__userInteraction__userBtn__ratingContainer">
              {renderSelectedRating}

              <AnimatePresence>
                {isRating && (
                  <motion.div
                    className="headerMoreInfo__details__userInteraction__userBtn__ratingContainer__ratingBtn d-flex flex-row gap-1 p-2"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.7 }}
                    transition={{ duration: 0.25 }}
                    onMouseLeave={handleLeaveRating}
                    onMouseEnter={handleEnterRating}
                  >
                    {renderRatingOption}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

HeaderMoreInfo.propTypes = {
  dataDetail: PropTypes.object.isRequired,
}

export default HeaderMoreInfo;
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { genreMap } from "../data/movieGenreData";
import { useClickOutside } from "../customHooks/useClickOutside";
import { useGetDataQuery, useSetDeleteHistoryRatingMutation, useSetDeleteMyListMutation, useSetHitoryRatingMutation, useSetMyListMutation } from "../service/redux/API/firebaseDB";
import LoadingComp from "./loadingComp";
import { useMoreInfo } from "../customHooks/useMoreInfo";
import useHandlePlay from "../customHooks/useHandlePlay";

const ImgPopUpComp = ({ data }) => {
  const { poster_path, genre_ids, id, title, name, media_type } = data;

  const handlePlay = useHandlePlay();
  
  const [ratingIndex, setRatingIndex] = useState(null);
  const [isRating, setIsRating] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isMylist, setMylist] = useState(false);
  const optionRatingRef = useRef(null);
  const timeOutRatingRef = useRef(null);
  const mainPopUpRef = useRef(null);
  const timeOutMainPopUp = useRef(null);
  const timeOutDelayPopUpRef = useRef(null);
  const clickOutSide = useClickOutside;

  const { data: dataGet, isLoading, refetch } = useGetDataQuery();
  const [triggerSetHistoryRating] = useSetHitoryRatingMutation();
  const [triggerSetMyList] = useSetMyListMutation();
  const [triggerSetDeleteHistoryRating] = useSetDeleteHistoryRatingMutation();
  const [triggerSetDeleteMyList] = useSetDeleteMyListMutation();

  const userOptionSelected = dataGet?.userOption[dataGet.userSelected];
  const { historyRating, myList } = userOptionSelected;

  const rated =
    historyRating !== "empty" && Array.isArray(historyRating)
      ? historyRating.find((val) => val.id === id) || null
      : null;

  clickOutSide(optionRatingRef, isRating, setIsRating);

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

  const validGenreIds = Array.isArray(genre_ids) ? genre_ids : [];
  const renderGenre = validGenreIds.map((val, index) => {
    return <p key={index}>{genreMap[val]}</p>;
  });

  const buttonIcons = ["fa-thumbs-down", "fa-thumbs-up", "fa-heart"];

  const handleOptionRating = (idx) => {
    if (ratingIndex === idx) {
      setRatingIndex(null);
    } else {
      setRatingIndex(idx);
    }
    setIsRating(false);
  };

  const renderSelectedRating = (
    <button onMouseEnter={() => setIsRating(true)} onClick={() => setIsRating(true)}>
      <i
        className={`fa-${
          ratingIndex !== null ? "solid" : "regular"
        } ${ratingIndex !== null ? buttonIcons[ratingIndex] : "fa-thumbs-up"}`}
      ></i>
    </button>
  );

  const renderRatingOption = buttonIcons.map((icon, idx) => {
    return (
      <button key={idx} onClick={() => handleOptionRating(idx)}>
        <i className={`fa-${ratingIndex === idx ? "solid" : "regular"} ${icon}`}></i>
      </button>
    );
  });

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

  const handleEnterPopUp = () => {
    if (timeOutMainPopUp.current) {
      clearTimeout(timeOutMainPopUp.current);
    }
    
    if (timeOutDelayPopUpRef.current) {
      clearTimeout(timeOutDelayPopUpRef.current);
    }
  
    timeOutDelayPopUpRef.current = setTimeout(() => {
      setIsHover(true);
    }, 300);
  };

  const handleClick = () => {
    if (timeOutDelayPopUpRef.current) {
      clearTimeout(timeOutDelayPopUpRef.current);
    }

    if (timeOutMainPopUp.current) {
      clearTimeout(timeOutMainPopUp.current);
    }

    setIsHover(prev => !prev);
  }
  
  const handleLeavePopUP = async () => {
    if (timeOutDelayPopUpRef.current) {
      clearTimeout(timeOutDelayPopUpRef.current);
    }
  
    timeOutMainPopUp.current = setTimeout(() => {
      setIsHover(false);
    }, 250);
  
    if (ratingIndex !== null && (!rated || rated.score !== ratingIndex)) {
      await triggerSetHistoryRating({ id, score: ratingIndex, name: title || name, media_type });
      await refetch();
    } else if (ratingIndex === null && rated) {
      await triggerSetDeleteHistoryRating({ id: id, name: title || name });
      await refetch();
    }   

    if (isMylist) {
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
        await triggerSetDeleteMyList({ id: id, title: title || name });
        await refetch();
      }
    }
  };

  const { addMoreInfo } = useMoreInfo();

  const handleMoreInfo = () => {
    addMoreInfo(id, media_type);
  }
  
  if (isLoading) {
    return <LoadingComp />;
  }

  return (
    <div className="ImgPopUpComp">
      {poster_path 
        ? <img
            onMouseEnter={handleEnterPopUp}
            onMouseLeave={handleLeavePopUP}
            onClick={handleClick}
            className="ImgPopUpComp__mainImg"
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt="background"
          />
        : <div 
            onMouseEnter={handleEnterPopUp}
            onMouseLeave={handleLeavePopUP}
            className="ImgPopUpComp__noresult">
              {name || title}
          </div>
      }

      <AnimatePresence>
        {isHover && <motion.div 
          className="ImgPopUpComp__popUp"
          ref={mainPopUpRef}
          initial={{ scale: 1 }}
          animate={{ scale: 1.01 }}
          exit={{ scale: 1  }}
          transition={{ duration: 0.25 }}
          onMouseEnter={handleEnterPopUp}
          onMouseLeave={handleLeavePopUP}
          onClick={handleClick}
        >
          {poster_path 
            ? <img
                className="ImgPopUpComp__mainImg"
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                alt="background"
              />
            : <div className="ImgPopUpComp__noresult__hover">{name || title}</div>
          }

          <div className="ImgPopUpComp__popUp__optionBtn d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row flex-wrap gap-1">
              <button onClick={() => handlePlay(id, media_type, name || title)} className="buttonPlay buttonOutside">
                <i className="fa-solid fa-play"></i>
              </button>

              <button onClick={() => setMylist(prev => !prev)} className="buttonList buttonOutside">
                {isMylist 
                  ? <i className="fa-solid fa-check"></i> 
                  : <i className="fa-solid fa-plus"></i>
                }
              </button>

              <div className="buttonRating buttonOutside">
                {renderSelectedRating}

                <AnimatePresence>
                  {isRating && (
                    <motion.div
                      className="buttonRating__ratingOption d-flex flex-row gap-1"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.7 }}
                      transition={{ duration: 0.25 }}
                      ref={optionRatingRef}
                      onMouseLeave={handleLeaveRating}
                      onMouseEnter={handleEnterRating}
                    >
                      {renderRatingOption}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button onClick={handleMoreInfo} className="buttonMoreInfo buttonOutside">
              <i className="fa-solid fa-chevron-down"></i>
            </button>
          </div>

          <div className="ImgPopUpComp__popUp__information d-flex flex-row gap-2 flex-wrap">
            {renderGenre}
          </div>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
};

ImgPopUpComp.propTypes = {
  data: PropTypes.object,
};

export default ImgPopUpComp;

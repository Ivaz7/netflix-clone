import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { genreMap } from "../data/movieGenreData";
import { useClickOutside } from "../customHooks/useClickOutside";
import { useGetDataQuery } from "../service/redux/API/firebaseDB";
import LoadingComp from "./loadingComp";

const ImgPopUpComp = ({ data }) => {
  const { poster_path, genre_ids, id: idMovie } = data;
  
  const [ratingIndex, setRatingIndex] = useState(null);
  const [isRating, setIsRating] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const optionRatingRef = useRef(null);
  const timeOutRatingRef = useRef(null);
  const mainPopUpRef = useRef(null);
  const timeOutMainPopUp = useRef(null);
  const clickOutSide = useClickOutside;

  const { data: dataGet, isLoading } = useGetDataQuery();

  const userOptionSelected = dataGet?.userOption[dataGet.userSelected];
  const { rating } = userOptionSelected.history;

  const rated =
    rating !== "empty" && Array.isArray(rating)
      ? rating.find((val) => val.id === idMovie) || null
      : null;

  clickOutSide(optionRatingRef, isRating, setIsRating);

  useEffect(() => {
    if (rated && typeof rated.score === "number") {
      setRatingIndex(rated.score);
    } else {
      setRatingIndex(null);
    }
  }, [rated]);

  const renderGenre = genre_ids.map((val, index) => {
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
    setIsHover(true);
  };
  
  const handleLeavePopUP = () => {
    timeOutMainPopUp.current = setTimeout(() => {
      setIsHover(false);
    }, 250);
  };
  

  if (isLoading) {
    return <LoadingComp />;
  }

  return (
    <div className="ImgPopUpComp">
      <img
        onMouseEnter={handleEnterPopUp}
        className="ImgPopUpComp__mainImg"
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt="background"
      />

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
        >
          <img
            className="ImgPopUpComp__popUp__img"
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            alt="background"
          />

          <div className="ImgPopUpComp__popUp__optionBtn d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row flex-wrap gap-1">
              <button className="buttonPlay buttonOutside">
                <i className="fa-solid fa-play"></i>
              </button>

              <button className="buttonList buttonOutside">
                {/* <i className="fa-solid fa-check"></i> */}
                <i className="fa-solid fa-plus"></i>
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

            <button className="buttonMoreInfo buttonOutside">
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

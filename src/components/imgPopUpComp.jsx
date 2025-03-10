import PropTypes from "prop-types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { genreMap } from "../data/movieGenreData";

const ImgPopUpComp = ({ data }) => {
  const { poster_path, genre_ids } = data;
  
  const [ratingIndex, setRatingIndex] = useState(1);
  const [isRating, setIsRating] = useState(false);

  const renderGenre = genre_ids.map((val, index) => {
    return <p key={index}>{genreMap[val]}</p>;
  });

  const buttonIcons = ["fa-thumbs-down", "fa-thumbs-up", "fa-heart"];

  const handleOptionRating = (idx) => {
    setIsRating(false);
    setRatingIndex(idx);
  };

  return (
    <div className="ImgPopUpComp">
      <img
        className="ImgPopUpComp__mainImg"
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt="background"
      />

      <div className="ImgPopUpComp__popUp">
        <img
          className="ImgPopUpComp__popUp__img"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt="background"
        />

        <div className="ImgPopUpComp__popUp__optionBtn d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex flex-row gap-1">
            <button>
              <i className="fa-solid fa-play"></i>
            </button>

            <button>
              <i className="fa-solid fa-check"></i>
            </button>

            <div className="buttonRating">
              <button onClick={() => setIsRating(true)}>
                <i className={`fa-${ratingIndex !== null ? "solid" : "regular"} ${buttonIcons[ratingIndex]}`}></i>
              </button>

              <AnimatePresence>
                {isRating && <motion.div 
                  className="buttonRating__ratingOption d-flex flex-row gap-1"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  transition={{ duration: 0.25 }}
                >
                  {buttonIcons.map((icon, idx) => (
                    <button key={idx} onClick={() => handleOptionRating(idx)}>
                      <i className={`fa-${ratingIndex === idx ? "solid" : "regular"} ${icon}`}></i>
                    </button>
                  ))}
                </motion.div>}
              </AnimatePresence>
            </div>
          </div>

          <button>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>

        <div className="ImgPopUpComp__popUp__information">
          {renderGenre}
        </div>
      </div>
    </div>
  );
};

ImgPopUpComp.propTypes = {
  data: PropTypes.object,
};

export default ImgPopUpComp;

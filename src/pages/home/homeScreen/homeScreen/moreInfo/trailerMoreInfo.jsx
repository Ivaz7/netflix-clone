import PropTypes from "prop-types";
import { useState } from "react";

const TrailerMoreInfo = ({ dataTrailer }) => {
  const [visibleCount, setVisibleCount] = useState(5); 
  const increment = 3; 
  const isMax = visibleCount >= dataTrailer.length;

  const handleClick = () => {
    if (isMax) {
      setVisibleCount(5);
    } else {
      setVisibleCount((prev) => Math.min(prev + increment, dataTrailer.length));
    }
  };

  const renderTrailer = dataTrailer.slice(0, visibleCount).map((val, inx) => {
    const { name, key } = val;

    return (
      <div
        className="trailerMoreInfo__trailerContainer__trailer d-flex flex-sm-row flex-column gap-2 align-items-center"
        key={inx}
      >
        <div className="d-flex gap-sm-3 gap-2 align-items-center flex-sm-row flex-column">
          <h1>{inx + 1}</h1>

          <img
            src={`https://img.youtube.com/vi/${key}/maxresdefault.jpg`}
            alt={name}
            className="trailerMoreInfo__trailerContainer__trailer__thumbnail"
          />
        </div>

        <h3 className="text-center flex-grow-1">{name}</h3>
      </div>
    );
  });

  return (
    <div className="trailerMoreInfo d-flex flex-column gap-2">
      <h1>Trailer</h1>

      <div className="trailerMoreInfo__trailerContainer d-flex flex-column align-items-center">
        {renderTrailer}

        <button 
          className="trailerMoreInfo__trailerContainer__btnMore" 
          onClick={handleClick}
        >
          <i className={`fa-solid ${isMax ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
        </button>
      </div>
    </div>
  );
};

TrailerMoreInfo.propTypes = {
  dataTrailer: PropTypes.array.isRequired,
};

export default TrailerMoreInfo;

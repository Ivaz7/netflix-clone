import PropTypes from "prop-types";
import { useState } from "react";
import { useGetDataQuery, useSetDeleteMyListMutation, useSetMyListMutation } from "../../../../../service/redux/API/firebaseDB";
import useHandlePlay from "../../../../../customHooks/useHandlePlay";

const SimilarShowMoreInfo = ({ dataDetail, similarShows }) => {
  const { media_type } = dataDetail;

  const [visibleCount, setVisibleCount] = useState(3);
  const increment = 3;
  const isMax = visibleCount >= similarShows.length;
  
  const handleClick = () => {
    if (isMax) {
      setVisibleCount(3);
    } else {
      setVisibleCount((prev) => Math.min(prev + increment, similarShows.length));
    }
  };

  const { data: dataGet, refetch } = useGetDataQuery();
  const [triggerSetMyList] = useSetMyListMutation();
  const [triggerSetDeleteMyList] = useSetDeleteMyListMutation();
  const handlePlay = useHandlePlay();
  
  const userOptionSelected = dataGet?.userOption[dataGet.userSelected];
  const { myList } = userOptionSelected;

  const handleMyList = async (id, poster_path, genre_ids, title, name, isMyList) => {
    if (isMyList) {
      await triggerSetDeleteMyList({ id, title: title || name });
      await refetch();
    } else {
      await triggerSetMyList({ id, poster_path, genre_ids, title: title || name });
      await refetch();
    }
  };

  const renderShows = similarShows.slice(0, visibleCount).map((show, index) => {
    const { title, name, overview, backdrop_path, poster_path, id, genre_ids } = show;
    const isMyList = myList !== "empty" && Array.isArray(myList) && myList.some(item => item.id === id);

    const renderMylist = isMyList ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-plus"></i>;

    return (
      <div
        className="similarShowMoreInfo__showContainer__show d-flex flex-column"
        key={index}
        onClick={() => handlePlay(id, media_type, name || title)}
      >
        <div className="similarShowMoreInfo__showContainer__show__containerPoster">
          <img
            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
            alt={title || name}
            className="similarShowMoreInfo__showContainer__show__containerPoster__poster"
          />

          <div className="similarShowMoreInfo__showContainer__show__containerPoster__playHover">
            <i className="fa-solid fa-play"></i>
          </div>
        </div>

        <div className="similarShowMoreInfo__showContainer__show__detail d-flex flex-column gap-2">
          <div className="d-flex flex-row justify-content-between align-items-center gap-2">
            <h6 className="m-0">{title || name}</h6>
            <div className="similarShowMoreInfo__showContainer__show__detail__btnMyListContainer">
              <button 
                onClick={() => handleMyList(id, poster_path, genre_ids, title, name, isMyList)} 
                className="similarShowMoreInfo__showContainer__show__detail__btnMyListContainer__btnMyList"
              >
                {renderMylist}
              </button>
            </div>
          </div>

          <p>{overview}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="similarShowMoreInfo d-flex flex-column gap-2">
      <h1>More Like This</h1>

      <div className="similarShowMoreInfo__showContainer">
        {renderShows}
      </div>

      <button 
        className="similarShowMoreInfo__btnMore align-self-center" 
        onClick={handleClick}
      >
        <i className={`fa-solid ${isMax ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
      </button>
    </div>
  );
};

SimilarShowMoreInfo.propTypes = {
  similarShows: PropTypes.array.isRequired,
  dataDetail: PropTypes.object.isRequired,
};

export default SimilarShowMoreInfo;

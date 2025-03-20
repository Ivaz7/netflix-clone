import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingComp from "../../components/loadingComp";
import { useGetDataQuery, useGetLoginStatusQuery, useSetDeleteHistoryRatingMutation, useSetDeleteHistoryWatchedMutation, useSetHitoryRatingMutation, } from "../../service/redux/API/firebaseDB";
import HeaderSetting from "./headerSetting";
import { useState } from "react";
import ProfileImg from "../../components/profileImg";
import Footer from "../../components/footer";
import { useLazyGetInfoMediaTypeQuery } from "../../service/redux/API/tmdbApiSlicee";
import { motion } from "framer-motion";

const ViewingActivity = () => {
  const { data: dataStatus, isLoading: isLoadingStatus } = useGetLoginStatusQuery();
  const { data: dataGet, isLoading: isLoadingDataGet, refetch } = useGetDataQuery();
  const [triggerSetHistoryRating] = useSetHitoryRatingMutation();
  const [triggerSetDeleteHistoryRating] = useSetDeleteHistoryRatingMutation();
  const [triggerSetDeleteHistoryWatched] = useSetDeleteHistoryWatchedMutation();
  const [triggerGetMediaType] = useLazyGetInfoMediaTypeQuery();
  const [searchParam] = useSearchParams();
  const indexUserOption = searchParam.get("indexUserOption");
  const navigate = useNavigate();

  const userOptionArr = dataGet?.userOption;
  const userSelectedData = dataGet?.userSelected;
  const userIndex = (userSelectedData !== "empty" ? userSelectedData : indexUserOption) || 0;
  const userOptionSelected = userOptionArr?.[userIndex];
  const statusAge = userOptionSelected?.statusAge;
  const imgProfile = userOptionSelected?.imgProfile;
  const name = userOptionSelected?.name;
  const historyWatched = userOptionSelected?.historyWatched;
  const historyRating = userOptionSelected?.historyRating;

  const [isWatched, setIsWatched] = useState(true);

  // history rating
  const handleClickRating = async (id, name, inx, score) => {
    if (score === inx) {
      await triggerSetDeleteHistoryRating({ id: id, name: name });
      refetch();
    } else {
      await triggerSetHistoryRating({ id: id, score: inx, name: name });
      refetch();
    }
  }
  const handleLinkRating = async (id) => {
    const respone = await triggerGetMediaType(id);
    const data = respone?.data;
    await navigate(`/?moreInfo=${id}&categoryMoreInfo=${data}`);
  }
  const renderRating = historyRating?.map((val, inx) => {
    const { name, score, id } = val;
    
    const ratingList = ["fa-thumbs-down", "fa-thumbs-up", "fa-heart"];

    const renderRatingList = ratingList.map((val, inx) => {
      return (
        <button onClick={() => handleClickRating(id, name, inx, score)} className={`viewingActivity__main__content__inside__renderHistory__rating__ratingBtn ${inx === score ? "actived" : ""} d-flex justify-content-center align-items-center`} id="btnRatingHistory" key={inx}>
          <i className={`${inx === score ? "fa-solid" : "fa-regular"} ${val}`}></i>
        </button>
      )
    })

    return (
      <div className="viewingActivity__main__content__inside__renderHistory__rating d-flex flex-row align-items-center justify-content-between" key={inx}>
        <a onClick={() => handleLinkRating(id)}>
          {name}
        </a>

        <div className="d-flex flex-row align-items-center gap-1">
          {renderRatingList}
        </div>
      </div>
    )
  })

  //  history watched
  const [isDeleteHover, setIsDeleteHover] = useState(false);
  const handleDeleteWatched = async (id, showName, trailerName) => {
    await triggerSetDeleteHistoryWatched({ id, showName, trailerName });
    refetch();
  }
  const renderWatched = historyWatched?.map((val, inx) => {
    const { id, showName, media_type, key, trailerName } = val 

    return (
      <div className="viewingActivity__main__content__inside__renderHistory__watched d-flex flex-row align-items-center justify-content-between" key={inx}>
        <a onClick={() => navigate(`/watch?key=${key}`)}>
          {showName} | {trailerName} | {media_type === "tv" ? "Tv Shows" : "Movie"}
        </a>

        <div onMouseEnter={() => setIsDeleteHover(true)} onMouseLeave={() => setIsDeleteHover(false)} onClick={() => handleDeleteWatched(id, showName, trailerName)} className="viewingActivity__main__content__inside__renderHistory__watched__deleteBtn">
          <i className="fa-solid fa-trash-can"></i>
          
          {isDeleteHover && <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Delete History Rating
          </motion.span>}
        </div>
      </div>
    )
  })

  const noActivity = (
    <div className="viewingActivity__noActivity d-flex align-items-center justify-content-center">
      No Activity Yet
    </div>
  )

  if (isLoadingStatus || isLoadingDataGet) {
    return <LoadingComp />;
  }

  if (!dataStatus) {
    navigate("/");
    return;
  }

  return (
    <div className="outerViewingActivity">
      <div className="viewingActivity d-flex flex-column align-items-center">
        <HeaderSetting dataGet={dataGet} indexUserOption={userIndex} />

        <main className="viewingActivity__main d-flex flex-column flex-lg-row align-items-start my-3">
          <button onClick={() => navigate(-1)} className="viewingActivity__main__backBtn">
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div className="viewingActivity__main__content d-flex flex-column gap-3 mx-lg-auto">
            <div className="viewingActivity__main__content__header d-flex flex-row justify-content-between align-items-center">
              <h2>
                Activity For
              </h2>

              <div className="d-flex flex-row align-items-center gap-2">
                <ProfileImg 
                  scale={"2rem"}
                  avatarImg={imgProfile}
                  statusAge={statusAge}
                  fontSizeKids={"0.8rem"}
                  sizeShadow={"0.7px"}
                />

                <p className="m-0">
                  {name}
                </p>
              </div>
            </div>

            <div className="viewingActivity__main__content__inside d-flex flex-column gap-4">
              <div className="d-flex flex-row align-items-center gap-2">
                <a className={`${isWatched ? "watched" : ""}`} onClick={() => setIsWatched(true)}>
                  Watched
                </a>

                <a className={`${!isWatched ? "watched" : ""}`} onClick={() => setIsWatched(false)}>
                  Rating
                </a>
              </div>

              <div className="viewingActivity__main__content__inside__renderHistory">
              {isWatched 
                ? ((historyWatched && historyWatched !== "empty" && historyWatched.length > 0) ? renderWatched : noActivity)
                : ((historyRating && historyRating !== "empty" && historyRating.length > 0) ? renderRating : noActivity)
              }
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer type={true}/>
    </div>
  )
}

export default ViewingActivity;
import PropTypes from "prop-types";
import ProfileImg from "../../../../../components/profileImg";
import SpanTriangle from "../../../../../components/spanTriagle";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "../../../../../customHooks/useClickOutside";
import { useGetDataQuery, useGetLoginStatusQuery, useSetChangedUserDataMutation } from "../../../../../service/redux/API/firebaseDB";
import LoadingComp from "../../../../../components/loadingComp";
import { signOut } from "firebase/auth";
import { auth } from "../../../../../backEndFireBase/firebaseConfig";
import CustomFloatingComp from "../../../../../components/customFloatingComp";
import { useNavigate } from "react-router-dom";

const RightSideHeaderHome = ({ data }) => {
  const { userOption, userSelected } = data;
  const userOptionSelected = userOption[userSelected];
  const { imgProfile } = userOptionSelected;
  const navigate = useNavigate();

  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef(null);
  const focusRef = useRef(null);
  useClickOutside(searchRef, isSearch, setIsSearch);
  
  useEffect(() => {
    if (isSearch) {
      focusRef.current.focus();
    }
  }, [isSearch])

  const [isProfile, setIsProfile] = useState(false);
  const profileRef = useRef(null);
  const timeOutRef = useRef(null);

  const [triggerChangedUserData, { isLoading: isLoadingPushedData }] = useSetChangedUserDataMutation();
  const { refetch: refetchData } = useGetDataQuery();
  const { refetch: refetchStatus } = useGetLoginStatusQuery();

  if (isLoadingPushedData) {
    <CustomFloatingComp>
      <LoadingComp />
    </CustomFloatingComp>
  }

  const renderUserOption = userOption.map((val, index) => {
    if (index === userSelected) {
      return;
    }

    const { imgProfile, name } = val;

    return (
      <button className="headerHome__inside__rightSide__infoProfileDiv__dropDown__btn d-flex flex-row align-items-center gap-2" key={index}>
        <ProfileImg 
          scale={"2rem"}
          avatarImg={imgProfile}
        />

        <p>{name}</p>
      </button>
    )
  })

  const handleEnterDropDown = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }
    setIsProfile(true);
  }

  const handleLeaveDropDown = () => {
    timeOutRef.current = setTimeout(() => {
      setIsProfile(false);
    }, 250)
  }

  const handleClickDropDown = () => {
    setIsProfile(prev => !prev)
  }

  const handleSignOut = async () => {
    await triggerChangedUserData({ value: { userSelected: "empty" } });
    await signOut(auth);
    await refetchData();
    await refetchStatus();
  }

  const handleClickSettings = () => {
    navigate("/settings");
  }

  return (
    <div className="headerHome__inside__rightSide d-flex flex-row gap-2 gap-md-3 align-items-center">
      <div className="headerHome__inside__rightSide__searchDiv">
        {!isSearch && <button onClick={() => setIsSearch(true)} className="headerHome__inside__rightSide__searchDiv__btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>}

        {isSearch && <motion.div
          initial={{ width: 20 }}
          animate={{ width: 270 }}
          transition={{ duration: 0.3 }}
          ref={searchRef}
          className="headerHome__inside__rightSide__searchDiv__input d-flex flex-row gap-2 align-items-center"
        >
          <i className="fa-solid fa-magnifying-glass"></i>

          <input ref={focusRef} type="text" placeholder="Titles or Genre" />
        </motion.div>}
      </div>

      <div ref={profileRef} onClick={handleClickDropDown} onMouseEnter={handleEnterDropDown} onMouseLeave={handleLeaveDropDown} className="headerHome__inside__rightSide__infoProfileDiv d-flex flex-row gap-2 align-items-center">
        <ProfileImg 
          scale={"2rem"}
          avatarImg={imgProfile}
        />

        <div className="headerHome__inside__rightSide__infoProfileDiv__spanTriangleDivHead d-flex aling-items-center">
          <SpanTriangle rotated={!isProfile} />
        </div>

        <AnimatePresence>
          {isProfile && 
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }} 
              className="headerHome__inside__rightSide__infoProfileDiv__dropDown d-flex flex-column gap-2"
            >
              <div className="headerHome__inside__rightSide__infoProfileDiv__dropDown__spanTriangleDivDropDown align-self-end">
                <SpanTriangle rotated={false} />
              </div>

              <div className="headerHome__inside__rightSide__infoProfileDiv__dropDown__inside">
                <div className="headerHome__inside__rightSide__infoProfileDiv__dropDown__inside__user">
                  {renderUserOption}
                </div>

                <div className="headerHome__inside__rightSide__infoProfileDiv__dropDown__inside__setting d-flex flex-column gap-1">
                  <button onClick={handleClickSettings} className="d-flex flex-row gap-2 align-items-center">
                    <i className="fa-solid fa-gear"></i>

                    <p>Setting/History</p>
                  </button>

                  <button className="d-flex flex-row gap-2 align-items-center">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>

                    <p>Exit Profile</p>
                  </button>
                </div>

                <button onClick={handleSignOut} className="headerHome__inside__rightSide__infoProfileDiv__dropDown__inside__signOut text-center">
                  <p>Sign Out</p>
                </button>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

RightSideHeaderHome.propTypes = {
  data: PropTypes.object,
}

export default RightSideHeaderHome;
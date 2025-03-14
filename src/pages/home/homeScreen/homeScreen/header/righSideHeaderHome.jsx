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
import { useQueryParams } from "../../../../../customHooks/useQueryParams";

const RightSideHeaderHome = ({ data }) => {
  const { userOption, userSelected } = data;
  const userOptionSelected = userOption[userSelected || 0];
  const { imgProfile, statusAge } = userOptionSelected;
  const navigate = useNavigate();
  const { searchParams, addParam, deleteParam } = useQueryParams();
  const searchVal = searchParams.get("search");
  const [search, setSearch] = useState(searchVal || "");

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

    const { imgProfile, name, statusAge } = val;

    return (
      <button onClick={() => handleUserOption(index)} className="headerHome__inside__rightSide__infoProfileDiv__dropDown__btn d-flex flex-row align-items-center gap-2" key={index}>
        <ProfileImg 
          scale={"2rem"}
          avatarImg={imgProfile}
          statusAge={statusAge}
          fontSizeKids={"0.5rem"}
          sizeShadow={"1px"}
        />

        <p>{name}</p>
      </button>
    )
  })

  const handleUserOption = async (index) => {
    await triggerChangedUserData({ value: { userSelected: index } });
    await refetchData();
    navigate("/")
  }

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

  const handleClickExit = async () => {
    await triggerChangedUserData({ value: { userSelected: "empty" } });
    await refetchData();
    await navigate("/");
  }

  const handleClickExitKids = async () => {
    await triggerChangedUserData({ value: { userSelected: "empty" } });
    await refetchData();
    await navigate("/?kids=true");
  }

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value === "") {
      deleteParam("search");
      return;
    }

    addParam("search", value);
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

          <input value={search} onChange={handleChangeSearch} ref={focusRef} type="text" placeholder="Titles or Genre" />
        </motion.div>}
      </div>

      <div ref={profileRef} onClick={handleClickDropDown} onMouseEnter={handleEnterDropDown} onMouseLeave={handleLeaveDropDown} className="headerHome__inside__rightSide__infoProfileDiv d-flex flex-row gap-2 align-items-center">
        <ProfileImg 
          scale={"2rem"}
          avatarImg={imgProfile}
          statusAge={statusAge}
          fontSizeKids={"0.5rem"}
          sizeShadow={"1px"}
        />

        {statusAge && <div className="headerHome__inside__rightSide__infoProfileDiv__exitProfile">
          <button onClick={handleClickExitKids} className="headerHome__inside__rightSide__infoProfileDiv__exitProfile__btn d-flex flex-row gap-2 align-items-center">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>

            <p>Exit Profile</p>
          </button>
        </div>}

        {!statusAge && <div className="headerHome__inside__rightSide__infoProfileDiv__spanTriangleDivHead d-flex aling-items-center">
          <SpanTriangle rotated={!isProfile} />
        </div>}

        <AnimatePresence>
          {isProfile && !statusAge &&
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
                <div className="headerHome__inside__rightSide__infoProfileDiv__dropDown__inside__user d-flex flex-column align-items-start gap-2">
                  {renderUserOption}
                </div>

                <div className="headerHome__inside__rightSide__infoProfileDiv__dropDown__inside__setting d-flex flex-column gap-1">
                  <button onClick={handleClickSettings} className="d-flex flex-row gap-2 align-items-center">
                    <i className="fa-solid fa-gear"></i>

                    <p>Setting/History</p>
                  </button>

                  <button onClick={handleClickExit} className="d-flex flex-row gap-2 align-items-center">
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
import PropTypes from "prop-types";
import ProfileImg from "../../../../../components/profileImg";
import SpanTriangle from "../../../../../components/spanTriagle";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "../../../../../customHooks/useClickOutside";

const RightSideHeaderHome = ({ data }) => {
  const { userOption, userSelected } = data;
  const userOptionSelected = userOption[userSelected];
  const { imgProfile } = userOptionSelected;

  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef(null);
  const focusRef = useRef(null);
  useClickOutside(searchRef, isSearch, setIsSearch);
  
  useEffect(() => {
    if (isSearch) {
      focusRef.current.focus();
    }
  }, [isSearch])

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

      <button className="headerHome__inside__rightSide__infoProfileBtn d-flex flex-row gap-2 align-items-center">
        <ProfileImg 
          scale={"2rem"}
          avatarImg={imgProfile}
        />

        <div className="headerHome__inside__rightSide__infoProfileBtn__spanTriangleDiv d-flex aling-items-center">
          <SpanTriangle rotated={true} />
        </div>
      </button>
    </div>
  )
}

RightSideHeaderHome.propTypes = {
  data: PropTypes.object,
}

export default RightSideHeaderHome;
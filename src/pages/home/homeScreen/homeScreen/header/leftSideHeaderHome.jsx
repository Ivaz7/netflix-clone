import { useRef, useState } from "react";
import SpanTriangle from "../../../../../components/spanTriagle";
import { motion, AnimatePresence } from "framer-motion";

const LeftSideHeaderHome = () => {
  const [isHover, setIsHover] = useState(false);
  const timeOutRef = useRef(null);

  const HandleMouseEnter = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }  
    setIsHover(true)
  }

  const HandleMouseLeave = () => {
    timeOutRef.current = setTimeout(() => {
      setIsHover(false)
    }, 250)
  }

  const handleClick = () => {
    setIsHover(prev => !prev);
  }

  return (
    <div className="headerHome__inside__leftSide d-flex flex-row gap-2 align-items-center">
      <img className="netflix-home" src="/netflix-logo.png" alt="logoNetflix" />
      
      <div onClick={handleClick} onMouseEnter={HandleMouseEnter} onMouseLeave={HandleMouseLeave} className="headerHome__inside__leftSide__dropDown d-flex align-items-center gap-2">
        Browse <SpanTriangle rotated={true} color={"rgb(230,230,230)"}/>

        <AnimatePresence>
          {isHover && 
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="headerHome__inside__leftSide__dropDown__itemDropDown d-flex flex-column align-items-center gap-1"
            >
              <SpanTriangle color={"rgb(230,230,230)"} />

              <div className="headerHome__inside__leftSide__dropDown__itemDropDown__btnContainer d-flex flex-column">
                <button>Home</button>

                <button>Movies</button>

                <button>Tv Shows</button>

                <button>My List</button>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      <div className="headerHome__inside__leftSide__themeSelected d-flex flex-row gap-2 gap-xl-3">
        <button>Home</button>

        <button>Movies</button>

        <button>Tv Shows</button>

        <button>My List</button>
      </div>
    </div>
  )
}

export default LeftSideHeaderHome;
import PropTypes from "prop-types";
import { useState } from "react";

const MainSlider = ({ children, name }) => {
  const [slide, SetSlider] = useState(0)

  const handleNext = () => {
    SetSlider(prev => prev - 50.06)
  }
 
  const handlePrev = () => {
    SetSlider(prev => prev + 50.06)
  }

  return (
    <div className="mainSlider d-flex flex-column gap-1 gap-sm-2 gap-md-3">
      <h1>{name}</h1>

      <div className="mainSlider__inside d-flex flex-row">
        <button onClick={handlePrev} className="mainSlider__inside__prevBtn">
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div 
          className="mainSlider__inside__items d-flex align-items-center"
          style={{ transform: `translateX(calc(${slide}%))`, transition: "0.7s ease-in-out"}}
        >
          {children} 
        </div>

        <button onClick={handleNext} className="mainSlider__inside__nextBtn">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

MainSlider.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default MainSlider;
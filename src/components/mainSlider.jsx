import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const MainSlider = ({ children, name }) => {
  const slideSix = 16.666;
  const slideFive = 20;
  const slideFour = 25;
  const slideThree = 33.333;
  const slideTwo = 50;

  const [slide, SetSlider] = useState(0)
  const [pieces, setPieces] = useState(slideSix);

  useEffect(() => {
    const updatePieces = () => {  
      if (window.innerWidth >= 1300) {
        setPieces(slideSix);
      } else if (window.innerWidth >= 992) {
        setPieces(slideFive);
      } else if (window.innerWidth >= 576) {
        setPieces(slideFour);
      } else if (window.innerWidth >= 334) {
        setPieces(slideThree);
      } else {
        setPieces(slideTwo);
      }
    };
  
    updatePieces();
  
    window.addEventListener("resize", updatePieces);
  
    return () => {
      window.removeEventListener("resize", updatePieces);
    };
  }, []);  

  const handleNext = () => {
    SetSlider(prev => prev - 100)
  }
 
  const handlePrev = () => {
    SetSlider(prev => prev + 100)
  }

  return (
    <div className="mainSlider d-flex flex-column gap-1 gap-sm-2 gap-md-3">
      <h1>{name}</h1>

      <div className="mainSlider__inside d-flex flex-row">
        <button onClick={handlePrev} className="mainSlider__inside__prevBtn">
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <div 
          className="mainSlider__inside__items"
          style={{ transform: `translateX(${slide}%)`, "--widthSlide": `${pieces}%`, }}
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
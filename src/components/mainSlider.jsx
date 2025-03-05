import PropTypes from "prop-types";
import { Children, useState } from "react";

const MainSlider = ({ children }) => {
  // now the slider can handle num 2 , 3 , 4 , and 5
  const num = 3;

  const totalSlides = Children.count(children);
  const [slide, setSlide] = useState(num);
  
  const handleNext = () => {
    setSlide(prev => {
      if (prev === totalSlides - 2) {
        return totalSlides;
      } else if (prev === totalSlides) {
        return num;
      } else {
        return prev + num;
      }
    });
  };
  
  const handlePrev = () => {
    setSlide(prev => {
      if (prev === num + 2) {
        return num;
      } else if (prev === num) {
        return totalSlides;
      } else {
        return prev - num;
      }
    });
  };

  const filteredChildren = Children.toArray(children).slice(slide - num, slide);

  return (
    <div className="mainSlider d-flex flex-row">
      <button onClick={handlePrev} className="mainSlider__prevBtn">
        Prev
      </button>

      <div className="mainSlider__items">{filteredChildren}</div>

      <button onClick={handleNext} className="mainSlider__nextBtn">
        Next
      </button>
    </div>
  );
};

MainSlider.propTypes = {
  children: PropTypes.node,
};

export default MainSlider;

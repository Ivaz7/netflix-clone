import PropTypes from "prop-types";
import { Children, useState } from "react";

const MainSlider = ({ children }) => {
  const totalSlides = Children.count(children);
  const [slide, setSlide] = useState(5);

  const handlePrev = () => {
    setSlide(prev => {
      if (prev - 5 < 5) {
        return totalSlides;
      } else {
        return prev - 5;
      }
    });
  };

  const handleNext = () => {
    setSlide(prev => {
      if (prev + 5 > totalSlides) {
        return 5;
      } else {
        return prev + 5;
      }
    });
  };

  const filteredChildren = Children.toArray(children).slice(slide - 5, slide);

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

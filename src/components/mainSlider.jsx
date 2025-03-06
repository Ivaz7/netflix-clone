import PropTypes from "prop-types";
import { Children, useEffect, useState } from "react";

const MainSlider = ({ children }) => {
  // now the slider can handle num 2, 3, 4, 5, and 6 seamlessly
  const num = 6;

  const totalSlides = Children.count(children);
  const [slide, setSlide] = useState(num);

  useEffect(() => {
    if (slide - num < 0) {
      setSlide(num);
    }
  }, [slide, num]);
  
  const handleNext = () => {
    setSlide(prev => {
      if (num === 2) {
        if (prev + num === totalSlides + 1) {
          return prev + 1;
        }
      }

      if (num === 3) {
        if (prev + num === totalSlides + 1) {
          return prev + 2;
        } else if (prev + num === totalSlides + 2) {
          return prev + 1;
        }
      }

      if (num === 4) {
        if (prev + num === totalSlides + 1) {
          return prev + 3;
        } else if (prev + num === totalSlides + 2) {
          return prev + 2;
        } else if (prev + num === totalSlides + 3) {
          return prev + 1;
        }
      }
      
      if (num === 5) {
        if (prev + num === totalSlides + 1) {
          return prev + 4;
        } else if (prev + num === totalSlides + 2) {
          return prev + 3;
        } else if (prev + num === totalSlides + 3) {
          return prev + 2;
        } else if (prev + num === totalSlides + 4) {
          return prev + 1;
        }
      }

      if (num === 6) {
        if (prev + num === totalSlides + 1) {
          return prev + 5;
        } else if (prev + num === totalSlides + 2) {
          return prev + 4;
        } else if (prev + num === totalSlides + 3) {
          return prev + 3;
        } else if (prev + num === totalSlides + 4) {
          return prev + 2;
        } else if (prev + num === totalSlides + 5) {
          return prev + 1;
        }
      }
      
      if (prev === totalSlides) {
        return num;
      } else {
        return prev + num;
      }
    });
  };
  
  const handlePrev = () => {
    setSlide(prev => {
      if (prev === num) {
        return totalSlides;
      }

      if (num === 2) {
        if (prev - num === 0) {
          return prev - 1;
        }
      }
  
      if (num === 3) {
        if (prev - num === 0) {
          return prev - 2;
        } else if (prev - num === -1) {
          return prev - 1;
        }
      }
  
      if (num === 4) {
        if (prev - num === 0) {
          return prev - 3;
        } else if (prev - num === -1) {
          return prev - 2;
        } else if (prev - num === -2) {
          return prev - 1;
        }
      }
  
      if (num === 5) {
        if (prev - num === 0) {
          return prev - 4;
        } else if (prev - num === -1) {
          return prev - 3;
        } else if (prev - num === -2) {
          return prev - 2;
        } else if (prev - num === -3) {
          return prev - 1;
        }
      }

      if (num === 6) {
        if (prev - num === 0) {
          return prev - 5;
        } else if (prev - num === -1) {
          return prev - 4;
        } else if (prev - num === -2) {
          return prev - 3;
        } else if (prev - num === -3) {
          return prev - 2;
        } else if (prev - num === -4) {
          return prev - 1;
        }
      }
      
      return prev - num;
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
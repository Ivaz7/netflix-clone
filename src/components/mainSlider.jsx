import PropTypes from "prop-types";
import { Children, useEffect, useState, useRef, useMemo } from "react";

const MainSlider = ({ children, name }) => {
  const slidesArray = Children.toArray(children);
  const totalSlides = slidesArray.length;

  const [pieces, setPieces] = useState(6);
  const [slide, setSlide] = useState(pieces);
  const [transform, setTransform] = useState(-(100 + 100 / pieces));
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);

  const clones = useMemo(() => {
    const cloneCount = pieces + 2;

    const leftStart = (slide - cloneCount + totalSlides) % totalSlides;
    const leftChildren = [];
    for (let i = 0; i < cloneCount; i++) {
      leftChildren.push(slidesArray[(leftStart + i) % totalSlides]);
    }

    const middleChildren = [];
    for (let i = 0; i < pieces; i++) {
      middleChildren.push(slidesArray[(slide + i) % totalSlides]);
    }

    const rightChildren = [];
    for (let i = 0; i < cloneCount; i++) {
      rightChildren.push(slidesArray[(slide + pieces + i) % totalSlides]);
    }

    return { leftChildren, middleChildren, rightChildren };
  }, [slide, pieces, slidesArray, totalSlides]);

  useEffect(() => {
    const updatePieces = () => {
      if (window.innerWidth >= 1300) {
        setPieces(6);
      } else if (window.innerWidth >= 996) {
        setPieces(5);
      } else if (window.innerWidth >= 768) {
        setPieces(4);
      } else if (window.innerWidth >= 496) {
        setPieces(3);
      } else {
        setPieces(2);
      }
    };

    updatePieces();
    window.addEventListener("resize", updatePieces);

    return () => {
      window.removeEventListener("resize", updatePieces);
    };
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transition = "0s";
    }
    setTransform(-(100 + 100 / pieces));

    setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.style.transition =
          "1s cubic-bezier(0.5, 0, 0.1, 1)";
      }
    }, 50);
  }, [slide, pieces]);

  const handleNext = () => {
    if (isAnimating) return; 
    setIsAnimating(true);
    setTransform((prev) => prev - 100);

    setTimeout(() => {
      setSlide((prev) => (prev + pieces) % totalSlides);
      setIsAnimating(false);
    }, 1000);
  };

  const handlePrev = () => {
    if (isAnimating) return; 
    setIsAnimating(true);
    setTransform((prev) => prev + 100);

    setTimeout(() => {
      setSlide((prev) => (prev - pieces + totalSlides) % totalSlides);
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className="mainSlider d-flex flex-column gap-1 gap-sm-2 gap-md-3">
      <h1>{name}</h1>
      <div className="mainSlider__inside d-flex flex-row">
        <button
          onClick={handlePrev}
          disabled={isAnimating}
          className="mainSlider__inside__prevBtn"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div
          ref={sliderRef}
          className="mainSlider__inside__items"
          style={{
            transform: `translateX(${transform}%)`,
            "--widthSlide": `${pieces}`,
          }}
        >
          {clones.leftChildren}
          {clones.middleChildren}
          {clones.rightChildren}
        </div>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="mainSlider__inside__nextBtn"
        >
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

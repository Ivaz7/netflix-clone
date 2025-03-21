import PropTypes from "prop-types";
import { useRef, useState, useEffect, useMemo } from "react";
import { useGetDataQuery } from "../service/redux/API/firebaseDB";
import { motion, AnimatePresence } from "framer-motion";

const PinSecurity = ({ setIsPin, func, inxUser }) => {
  const { data } = useGetDataQuery();
  const userOptionSelected = data?.userOption[inxUser];
  const pinSecurity = userOptionSelected?.pinSecurity;
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const inputRefs = useMemo(() => ([ref1, ref2, ref3, ref4]), []);

  const [inputPin, setInputPin] = useState(["", "", "", ""]);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    if (inputPin.every(val => val !== "")) {
      if (Number(inputPin.join("")) === pinSecurity) {
        setIsPin(false);
        func();
      } else {
        setIsWrong(true);
        setInputPin(["", "", "", ""]);inputRefs[0].current.focus();
      }
    }
  }, [pinSecurity, setIsPin, func, inputPin, inputRefs])

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [inputRefs]); 

  const handleChange = (e, inx) => {
    const value = e.target.value;

    if (/^\d?$/.test(value)) {
      setInputPin(prev => {
        const prevArr = [...prev];
        prevArr[inx] = value;
        return prevArr;
      });

      if (value && inx < inputRefs.length - 1) {
        inputRefs[inx + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, inx) => {
    if (e.key === "Backspace" && inx > 0) {
      inputRefs[inx - 1].current.focus();
    }
  };

  const renderInput = inputPin.map((val, inx) => (
    <input
      key={inx}
      type="text"
      value={val}
      ref={inputRefs[inx]}
      onChange={(e) => handleChange(e, inx)}
      onKeyDown={(e) => handleKeyDown(e, inx)}
    />
  ));

  return (
    <AnimatePresence>
      <div className="pinSecurity">
        <motion.div 
          className="pinSecurity d-flex flex-column align-items-center justify-content-center"
          initial={{ scale: .8 }}
          animate={{ scale: 1 }}
          exit={{ scale: .8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pinSecurity__topPart mb-5 d-flex flex-row justify-content-between">
            <div></div>

            <button onClick={() => setIsPin(false)}>
              <i className="fa-solid fa-x"></i>
            </button>
          </div>

          <div className="pinSecurity__detail d-flex flex-column mt-5 gap-2">
            <h6 className="m-0 text-center">
              Profile Lock is currently on.
            </h6>

            <h1 className={`m-0 text-center ${isWrong ? "yellow" : ""}`}>
              {!isWrong
                ? "Enter your PIN to access this profile."
                : "Wrong PIN, Please try again."}
            </h1>
          </div>

          <div className="pinSecurity__pinInput d-flex flex-row align-items-center justify-content-center">
            {renderInput}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

PinSecurity.propTypes = {
  setIsPin: PropTypes.func.isRequired,
  func: PropTypes.func.isRequired,
  inxUser: PropTypes.number.isRequired,
};

export default PinSecurity;

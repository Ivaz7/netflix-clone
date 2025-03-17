import PropTypes from "prop-types";
import { motion } from "framer-motion";

const CustomFloatingComp = ({ children, fixed }) => {
  return (
    <div className={`customFloatingEl ${fixed ? "fixedFloating" : ""} d-flex justify-content-center align-items-center`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.2 }}
        transition={{ duration: 0.2 }}
        className="customFloatingEl__Children"
      >
        {children}
      </motion.div>
  </div>
  )
}

CustomFloatingComp.propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
}

export default CustomFloatingComp;
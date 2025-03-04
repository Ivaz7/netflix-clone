import PropTypes from "prop-types";

const SpanTriangle = ({ rotated, color }) => {
  return (
    <span style={{ borderBottomColor: color }} className={`spanTriangle ${rotated ? "rotated" : ""}`}></span>
  )
}

SpanTriangle.propTypes = {
  rotated: PropTypes.bool,
  color: PropTypes.string,
}

export default SpanTriangle;
import PropTypes from "prop-types";

const GridSystemDisplay = ({ array }) => {
  return (
    <div className="gridSystemDisplay">
      {array}
    </div>
  )
}

GridSystemDisplay.propTypes = {
  array: PropTypes.array,
}

export default GridSystemDisplay;
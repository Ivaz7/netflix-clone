import PropTypes from "prop-types";

const AddUserOption = ({ setIsAdded }) => {
  const handleClick = () => {
    setIsAdded(prev => !prev)
  }

  return (
    <>
      <button className="addUserOptinBtn d-flex flex-column gap-3" onClick={handleClick}>
        <div className="addUserOptinBtn__upper">
          <div className="addUserOptinBtn__upper__insideVert"></div>
          <div className="addUserOptinBtn__upper__insideHorz"></div>
        </div>

        <h5>
          Add
        </h5>
      </button>
    </>
  )
}

AddUserOption.propTypes = {
  setIsAdded: PropTypes.func.isRequired,
}

export default AddUserOption;
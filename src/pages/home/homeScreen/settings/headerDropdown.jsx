import PropTypes from "prop-types";
import ProfileImg from "../../../../components/profileImg";
import SpanTriangle from "../../../../components/spanTriagle";

const HeaderDropdown = ({ dataGet }) => {
  const { userSelected, userOption } = dataGet;
  const userOptionSelected = userOption[userSelected];
  const { imgProfile } = userOptionSelected;

  return (
    <div className="headerSetting__inside__selectContainer">
      <div className="headerSetting__inside__selectContainer__head d-flex flex-row gap-2 align-items-center">
        <ProfileImg
          scale={"2rem"}
          avatarImg={imgProfile}
        />

        <SpanTriangle rotated={true} color={"rgb(75, 75, 75)"} />
      </div>

      <div className="headerSetting__inside__selectContainer__dropDown d-flex flex-column gap-1">
        <button className="d-flex flex-row justify-content-between align-items-center">
          <i className="fa-solid fa-arrow-left"></i>

          <p>Back to Netflix</p>
        </button>

        <div className="headerSetting__inside__selectContainer__dropDown__br"></div>

        <button className="d-flex flex-row justify-content-between align-items-center">
          <p>Switch Profile</p>
          
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        <button className="d-flex justify-content-start">
          <p>Sign Out</p>
        </button>
      </div>
    </div>
  )
}

HeaderDropdown.propTypes = {
  dataGet: PropTypes.object,
}

export default HeaderDropdown;
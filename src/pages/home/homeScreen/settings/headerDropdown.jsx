import PropTypes from "prop-types";

const HeaderDropdown = ({ avatarImg }) => {
  return (
    <button className="headerSetting__inside__selectContainerBtn">
      <img className="headerSetting__inside__img" src={`avatar/${avatarImg}`} alt="profile" />

      <div className="headerSetting__inside__selectContainer__selectBtn" name="selectBtn" id="selectBtn"></div>
    </button>
  )
}

HeaderDropdown.propTypes = {
  avatarImg: PropTypes.string,
}

export default HeaderDropdown;
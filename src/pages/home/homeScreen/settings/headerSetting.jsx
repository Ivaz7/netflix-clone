import PropTypes from "prop-types";

const HeaderSetting = ({ dataGet, profile }) => {
  const userSelected = dataGet.userOption[profile];
  const avatarImg = userSelected.imgProfile;

  console.log(userSelected)

  return (
    <header className="headerSetting d-flex justify-content-center align-items-center">
      <div className="headerSetting__inside d-flex justify-content-between">
        <img className="headerSetting__inside__img" src="netflix-logo.png" alt="netflix logo" />

        <button className="headerSetting__inside__selectContainerBtn">
          <img className="headerSetting__inside__img" src={`avatar/${avatarImg}`} alt="profile" />

          <div className="headerSetting__inside__selectContainer__selectBtn" name="selectBtn" id="selectBtn"></div>
        </button>
      </div>
    </header>
  )
}

HeaderSetting.propTypes = {
  dataGet: PropTypes.object,
  profile: PropTypes.number,
}

export default HeaderSetting;
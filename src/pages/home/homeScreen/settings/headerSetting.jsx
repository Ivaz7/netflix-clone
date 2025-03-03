import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeaderDropdown from "./headerDropdown";

const HeaderSetting = ({ dataGet, indexUserOption }) => {
  const userSelected = dataGet.userSelected;
  const userOptionSelected = dataGet.userOption[indexUserOption];
  const avatarImg = userOptionSelected.imgProfile;

  return (
    <header className="headerSetting d-flex justify-content-center align-items-center">
      <div className="headerSetting__inside d-flex justify-content-between">
        <Link to={"/"}>
          <img className="headerSetting__inside__img" src="/netflix-logo.png" alt="netflix logo" />
        </Link>

        {userSelected !== "empty" && <HeaderDropdown avatarImg={avatarImg} />}
      </div>
    </header>
  )
}

HeaderSetting.propTypes = {
  dataGet: PropTypes.object,
  indexUserOption: PropTypes.number,
}

export default HeaderSetting;
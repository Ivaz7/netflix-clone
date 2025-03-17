import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeaderDropdown from "./headerDropdown";

const HeaderSetting = ({ dataGet }) => {
  const userSelected = dataGet.userSelected;

  return (
    <header className="headerSetting d-flex justify-content-center align-items-center">
      <div className="headerSetting__inside d-flex justify-content-between">
        <Link to={"/"}>
          <img className="headerSetting__inside__img" src="/netflix-logo.png" alt="netflix logo" />
        </Link>

        {userSelected !== "empty" && <HeaderDropdown dataGet={dataGet} />}
      </div>
    </header>
  )
}

HeaderSetting.propTypes = {
  dataGet: PropTypes.object,
  indexUserOption: PropTypes.number,
}

export default HeaderSetting;
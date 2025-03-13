import { Link } from "react-router-dom";

const HeaderClearBlack = () => {
  return (
    <header className="headerClearBlack d-flex align-items-center">
      <div className="headerClearBlack__div d-flex align-items-center">
        <Link to={"/"}>
          <img src="netflix-logo.png" alt="logo" />
        </Link>
      </div>
    </header>
  )
}

export default HeaderClearBlack;
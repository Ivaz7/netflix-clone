import { useNavigate } from "react-router-dom";
import HeaderClearBlack from "../components/headerClearBlack";

const NotFound = ()=> {
  const navigate = useNavigate();

  return (
    <div className="notFoundPage d-flex flex-column align-items-center">
      <HeaderClearBlack />

      <div className="notFoundPage__inside text-center d-flex flex-column align-items-center gap-3">
        <h1>
          Lost Your Way?
        </h1>

        <h5>
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
        </h5>

        <button onClick={() => navigate("/")}>
          Netflix Home
        </button>

        <h3>
          Error Code <strong>NSES-404</strong>
        </h3>
      </div>

      <span>FROM <strong>LOST IN SPACE</strong></span>
    </div>
  )
}

export default NotFound;
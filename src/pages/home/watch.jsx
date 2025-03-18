import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetLoginStatusQuery } from "../../service/redux/API/firebaseDB";
import LoadingComp from "../../components/loadingComp";

const Watch = () => {
  const { data: dataLogin, isLoading: loadingLogin } = useGetLoginStatusQuery();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key");

  if (loadingLogin) {
    return <LoadingComp />;
  }

  if (!dataLogin) {
    navigate("/");
    return null;
  }

  return (
    key !== "undefined" ? (
      <iframe
        src={`https://www.youtube.com/embed/${key}`}
        className="watch"
      ></iframe>
    ) : (
      <div className="watch">No Trailer Available</div>
    )
  );
};

export default Watch;

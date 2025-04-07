import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../service/redux/API/fireBaseAuthSlice";
import { useGetLoginStatusQuery } from "../service/redux/API/firebaseDB";
import LoadingComp from "./loadingComp";
import { useDispatch } from "react-redux";
import { setStatus } from "../service/redux/slice/tryexample";

const UserTryExample = () => {
  const [signInTrigger, { isLoading }] = useLoginUserMutation();
  const { isLoading: isLoadingIsLogin, refetch } = useGetLoginStatusQuery(undefined, { refetchOnFocus: true });  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading || isLoadingIsLogin) {
    <LoadingComp />
  }

  const handleLogin = async () => {
    await signInTrigger({ email: "user@example.com", password: "123user" }).unwrap();
    await refetch();
    navigate("/")
  }

  return (
    <div className="userTryExample d-flex flex-column p-2 m-2 p-md-3 m-md-5 gap-1 gap-md-2">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <p className="m-0 text-start">
          Skip SignUp
        </p>

        <button onClick={() => dispatch(setStatus())} className="cancel d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-xmark"></i> 
        </button>
      </div>

      <p className="m-0 text-start">
        Email: user@example.com
      </p>

      <p className="m-0 text-start">
        Password: 123user
      </p>

      <button onClick={handleLogin} className="login">
        Login
      </button>
    </div>
  )
}

export default UserTryExample;
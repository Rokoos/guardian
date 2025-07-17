import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = () => {
  const { isAuth, isLoading, user } = useContext(UserContext);
  const token = localStorage.getItem("nannyTkn");
  if (!isLoading) {
    if (user || isAuth) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  }
};
export default PrivateRoute;

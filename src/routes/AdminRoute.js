import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AdminRoute = () => {
  const { isAuth, isAdmin, isLoading } = useContext(UserContext);
  const token = localStorage.getItem("nannyTkn");

  if (!isLoading) {
    if (token && isAuth && isAdmin) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  }
};
export default AdminRoute;

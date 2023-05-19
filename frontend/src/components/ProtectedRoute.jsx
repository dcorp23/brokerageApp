import { useContext } from "react";
import { UserContext } from "../App";
import { Outlet, Navigate } from "react-router-dom"; 

export const ProtectedRoute = () => {
    const {loginStatus} = useContext(UserContext);
    return ((loginStatus > 0) ? <Outlet /> : <Navigate to="/" />);
}

export default ProtectedRoute;
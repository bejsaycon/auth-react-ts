import { useLocation, Navigate, Outlet } from "react-router-dom";
import {useAuth} from "./hooks/useAuth";

const RequireLogout = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        !auth ? <Outlet /> :<Navigate to="/randomapp" state={{from: location}} replace/> 
    );
}

export default RequireLogout;
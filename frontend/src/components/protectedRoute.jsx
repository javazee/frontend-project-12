import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import routes from '../utils/routes';

export const ProtectedRoute = () => {
    const token = useSelector((state) => state.auth.token)
  
    if (!token) {
      return <Navigate to={routes.login} />;
    }
    
    return <Outlet />;
  };
  
// PrivateRoute.js
import { Navigate, Outlet, Route ,Routes ,useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ isAuthenticated}) => {

  if(!isAuthenticated){
    return <Navigate to="/login"/>
  }

  return <Outlet/>
};

export default PrivateRoute;

// PrivateRoute.js
import { Navigate, Outlet, Route ,Routes ,useLocation} from 'react-router-dom';
import { useAuthState } from './AuthContext';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ isAuthenticated}) => {
  // const { isAuthenticated } = useAuthState();
  // const isAuthenticated = useSelector((state) => state.isAuthenticated);
  // let location = useLocation();

  if(!isAuthenticated){
    return <Navigate to="/login"/>
  }

  return <Outlet/>
    // <Routes>

    //   <Routes
    //     // {...rest}
    //     element={isAuthenticated ? <component /> : <Navigate to="/login" replace />}
    //   />

    // </Routes>
    // component
  ;
};

export default PrivateRoute;

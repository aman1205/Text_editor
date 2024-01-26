import TextEditor from "./component/TextEditor";
import "./App.css";
import { v4 as uuidV4 } from "uuid";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./Auth/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useEffect ,useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  axios.defaults.withCredentials = true;
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);


  useEffect(() => {
    const savedToken = Cookies.get('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/*"
            element={<Navigate to={`/documents/${uuidV4()}`} />}
          />
          <Route path="/documents/:documentId" element={<TextEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

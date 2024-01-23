import TextEditor from "./component/TextEditor";
import "./App.css";
import { v4 as uuidV4 } from "uuid";
import  AuthProvider  from "./Auth/AuthContext";
import Login from './pages/Login';
import Signup from './pages/Signup';
 import PrivateRoute from "./Auth/PrivateRoute"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/documents/:documentId"
            element={<PrivateRoute component={<TextEditor />} />}
          />
          <Route path="/*" element={<Navigate to={`/documents/${uuidV4()}`} />} />
          {/* <Route path="/documents/:documentId" element={<TextEditor />} />
          <Route
            path="/*"
            element={<Navigate to={`/documents/${uuidV4()}`} />}
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

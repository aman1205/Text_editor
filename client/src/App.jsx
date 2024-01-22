import TextEditor from "./component/TextEditor";
import "./App.css";
import { v4 as uuidV4 } from "uuid";

import { BrowserRouter as Router, Routes, Route ,Navigate } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/documents/:documentId" element={<TextEditor />} />
        <Route path="/*" element={<Navigate to={`/documents/${uuidV4()}`} />} />
      </Routes>
    </Router>
  );
}

export default App;

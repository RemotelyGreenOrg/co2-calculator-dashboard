import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Calculator from "./components/Calculator"
import Location from "./components/Location"
import Messages from "./components/Messages";

// paths for Route should match url (endpoints)
// To navigate from one 'page' to another, you'll need the useNavigate() hook -- see comments at top of locatioin component.

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/calculator" element={<Calculator />} /> 
          <Route path="/location" element={<Location />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

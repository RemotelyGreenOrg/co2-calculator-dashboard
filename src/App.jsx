import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import EventPage from "./pages/EventPage";
import JoinEventForm from "./components/JoinEventForm";
import CreateEventForm from "./components/CreateEventForm";
import Messages from "./pages/Messages";

function App() {
  return (
    <>

	<BrowserRouter>
	  <Routes>
		  <Route path="/" element={<LandingPage/>}/>
		  <Route path="/event/:event_id" element={<EventPage/>}/>
		  <Route path="/create" element={<CreateEventForm/>}/>
		  <Route path="/join" element={<JoinEventForm/>}/>
		  <Route path="/message" element={<Messages/>}/>
	  </Routes>
	</BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartingPage from "./pages/StartingPage/StartingPage";
import RoomPage from "./pages/RoomPage/RoomPage"; 
import PeoplePage from "./pages/contentPage/people";
import PlacesPage from "./pages/contentPage/places";
import MenuPage from "./pages/MenuPage/MenuPage";
import './index.css';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/menu" element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;

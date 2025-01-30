import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartingPage from "./pages/StartingPage/StartingPage";
import RoomPage from "./pages/RoomPage/RoomPage"; 
import ContentPage from "./pages/contentPage/page";
import './index.css';

// import Flipbook from "./objects/Flipbook"; 

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/room" element={<RoomPage />} />
        <Route path="/content" element={<ContentPage />} />
      </Routes>
    </Router>
  );
}

export default App;

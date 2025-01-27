import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartingPage from "./pages/StartingPage";
// import RoomPage from "./roompage"; 
// import Flipbook from "./objects/Flipbook"; 

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<StartingPage />} />
      </Routes>
    </Router>
  );
}

export default App;

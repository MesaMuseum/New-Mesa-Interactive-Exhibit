import MusicPlayer from './components/MusicPlayer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartingPage from "./pages/StartingPage/StartingPage";
import RoomPage from "./pages/RoomPage/RoomPage"; 
import PeoplePage from "./pages/contentPage/people";
import PlacesPage from "./pages/contentPage/places";
import MenuPage from "./pages/MenuPage/MenuPage";
import Carousel_1 from "./pages/MenuPage/CarouselContent/carousel_1";
import Carousel_2 from "./pages/MenuPage/CarouselContent/carousel_2";
import Carousel_3 from "./pages/MenuPage/CarouselContent/carousel_3";
import Carousel_4 from "./pages/MenuPage/CarouselContent/carousel_4";
import Carousel_5 from "./pages/MenuPage/CarouselContent/carousel_5";
import Carousel_6 from "./pages/MenuPage/CarouselContent/carousel_6";
import Carousel_7 from "./pages/MenuPage/CarouselContent/carousel_7";
import Carousel_8 from "./pages/MenuPage/CarouselContent/carousel_8";
import Carousel_9 from "./pages/MenuPage/CarouselContent/carousel_9";
import Carousel_10 from "./pages/MenuPage/CarouselContent/carousel_10";
import Carousel_11 from "./pages/MenuPage/CarouselContent/carousel_11";
import Carousel_12 from "./pages/MenuPage/CarouselContent/carousel_12";
import InactivityHandler from './counter';
import TimelinePage from "./pages/contentPage/timelinePage";
import './index.css';

function App() {
  return (
    <>
      <MusicPlayer />
      <Router>
        <InactivityHandler timeoutMinutes={5} />
        <Routes>
          <Route path="/" element={<StartingPage />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/carousel_1" element={<Carousel_1 />} />
          <Route path="/carousel_2" element={<Carousel_2 />} />
          <Route path="/carousel_3" element={<Carousel_3 />} />
          <Route path="/carousel_4" element={<Carousel_4 />} />
          <Route path="/carousel_5" element={<Carousel_5 />} />
          <Route path="/carousel_6" element={<Carousel_6 />} />
          <Route path="/carousel_7" element={<Carousel_7 />} />
          <Route path="/carousel_8" element={<Carousel_8 />} />
          <Route path="/carousel_9" element={<Carousel_9 />} />
          <Route path="/carousel_10" element={<Carousel_10 />} />
          <Route path="/carousel_11" element={<Carousel_11 />} />
          <Route path="/carousel_12" element={<Carousel_12 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomeFeed from "./HomeFeed";
import Profile from "./Profile";
import Search from "./Search";
import Explore from "./Explore";
import Notifications from "./Notifications";
import MusicPlayer from "./MusicPlayer";
import Login from "./Login";
import Register from "./Register";
import CreatePost from "./CreatePost";
import UserProfile from "./UserProfile";
import MyMusic from "./MyMusic";
import Playlist from "./Playlist";
import Cancion from "./Cancion";
import Album from "./Album";
import CreatePlaylist from "./CreatePlaylist";
import AllSongs from "./AllSongs";
import GenreList from "./GenreList";
import "./App.css";

function App() {
  const location = useLocation();

  // Ocultar el MusicPlayer en las rutas de login y register
  const hideMusicPlayer =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="App">
      <div className="main-content">
        {/* Definición de rutas */}
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/music" element={<MyMusic />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/cancion" element={<Cancion />} />
          <Route path="/album" element={<Album />} />
          <Route path="/create-playlist" element={<CreatePlaylist />} />
          <Route path="/songs/:genreId" element={<AllSongs />} />
          <Route path="/generos" element={<GenreList />} />
        </Routes>
      </div>
      {!hideMusicPlayer && <MusicPlayer />}{" "}
      {/* MusicPlayer se oculta en login y register */}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

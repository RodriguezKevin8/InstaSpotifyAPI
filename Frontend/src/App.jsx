// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomeFeed from "./HomeFeed";
import Profile from "./Profile";
import Search from "./Search";
import Explore from "./Explore";
import Notifications from "./Notifications";
import MusicPlayer from "./MusicPlayer";
import Login from "./Login";
import Register from "./Register";
import CreatePost from "./CreatePost";
import "./App.css";

function App() {
	const location = useLocation();

	// Ocultar el MusicPlayer en las rutas de login y register
	const hideMusicPlayer = location.pathname === "/login" || location.pathname === "/register";

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
					<Route path="/create-post" element={<CreatePost />} /> {/* Nueva ruta */}
				</Routes>
			</div>
			{!hideMusicPlayer && <MusicPlayer />} {/* MusicPlayer se oculta en login y register */}
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

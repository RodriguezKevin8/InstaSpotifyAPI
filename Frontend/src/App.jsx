// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeFeed from "./HomeFeed";
import Profile from "./Profile";
import Search from "./Search";
import Explore from "./Explore";
import Notifications from "./Notifications";
import MusicPlayer from "./MusicPlayer";

import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
				
				<div className="main-content">
					{/* Definición de rutas */}
					<Routes>
						<Route path="/" element={<HomeFeed />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/search" element={<Search />} />
						<Route path="/notifications" element={<Notifications />} />
						<Route path="/explore" element={<Explore />} />
					</Routes>
				</div>
				<MusicPlayer /> {/* MusicPlayer siempre visible en la parte inferior */}
			</div>
		</Router>
	);
}

export default App;

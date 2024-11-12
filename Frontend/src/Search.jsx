// src/SearchPage.jsx
import "./Search.css";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

const SearchPage = () => {
	return (
		<div className="home-feed">
			{/* Sidebar */}
			<div className="sidebar">
				<h2>
					<Link to="/" className="logo">
						SPOTIGRAM
					</Link>{" "}
					{/* Enlace al Home Feed */}
				</h2>
				<ul>
				<Link to="/search" className="icon-button">
            <img src="/icons/SearchIcon.svg" alt="Search Icon" className="search-icon" />
            <span className="icon-text">Buscar</span>
          </Link>
          <Link to="/explore" className="icon-button">
            <img src="/icons/ExploreIcon.svg" alt="Explore Icon" className="search-icon" />
            <span className="icon-text">Explorar</span>
          </Link>
          <Link to="/notifications" className="icon-button">
            <img src="/icons/NotificationsIcon.svg" alt="Notifications Icon" className="search-icon" />
            <span className="icon-text">Notificaciones</span>
          </Link>
          <Link to="/music" className="icon-button">
            <img src="/icons/MusicIcon.svg" alt="Music Icon" className="search-icon" />
            <span className="icon-text">Mi Música</span>
          </Link>
          <Link to="/profile" className="icon-button profile-button">
            <img src="/icons/UserIcon.svg" alt="Profile Icon" className="search-icon" />
            <span className="icon-text">Mi Perfil</span>
          </Link>
				</ul>
			</div>

			{/* Main Content */}
			<div className="main-content">
				<div className="search-bar">
					<input type="text" placeholder="Search" />
					<img src="/icons/SearchIcon.svg" alt="Search Icon" />
				</div>

				<div className="search-results">
					<div className="result-item">
						<img src="/img/duki.png" alt="Duki" className="result-avatar" />
						<div className="result-info">
							<h3>DUKI</h3>
							<p>Mauro Ezequiel Lombardo - 13.7 M seguidores</p>
						</div>
					</div>
					<div className="result-item">
						<img
							src="/img/BadBunny.jpg"
							alt="Bad Bunny"
							className="result-avatar"
						/>
						<div className="result-info">
							<h3>BAD_BUNNY</h3>
							<p>Benito Martínez Ocasio - 45.6 M seguidores</p>
						</div>
					</div>
					<div className="result-item">
						<img
							src="/img/eladio.png"
							alt="Eladio Carrión"
							className="result-avatar"
						/>
						<div className="result-info">
							<h3>CARION.ELA</h3>
							<p>Eladio Carrión - 7 M seguidores</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchPage;

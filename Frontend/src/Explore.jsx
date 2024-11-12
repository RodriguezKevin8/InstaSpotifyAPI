import "./Explore.css";
import { Link } from "react-router-dom";

const Explore = () => {
	const explorePosts = [
		{ id: 1, image: "/img/post.jpg" },
		{ id: 2, image: "/img/post2.jpg" },
		{ id: 3, image: "/img/post3.jpg" },
		{ id: 4, image: "/img/post4.jpg" },
		{ id: 5, image: "/img/post5.jpg" },
		{ id: 6, image: "/img/post6.jpg" },
		{ id: 7, image: "/img/post7.jpg" },
		{ id: 8, image: "/img/post8.jpg" },
		{ id: 9, image: "/img/post.jpg" },
		{ id: 10, image: "/img/post2.jpg" },
		{ id: 11, image: "/img/post3.jpg" },
		{ id: 12, image: "/img/post4.jpg" },
	];

	return (
		<div className="explore-page">
			{/* Sidebar */}
			<div className="sidebar">
			<h2>
          <Link to="/" className="logo">SPOTIGRAM</Link> {/* Enlace al Home Feed */}
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

			{/* Contenido de la página Explore */}
			<div className="explore-content">
				<h2 className="explore-title">Explorar</h2>
				<div className="explore-grid">
					{explorePosts.map((post) => (
						<div key={post.id} className="explore-item">
							<img
								src={post.image}
								alt={`Post ${post.id}`}
								className="explore-image"
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Explore;

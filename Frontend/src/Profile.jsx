// src/Profile.jsx
import './HomeFeed.css';
import './Profile.css';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="home-feed">
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

      {/* Main Content */}
      <div className="main-content">
        {/* Profile Header */}
        <div>
          <img src="/img/romeo.jpeg" alt="Profile" className="profile-image" />
          <div className="profile-info">
            <h2>R.SANTOS</h2>
            <button className="edit-button">Editar Perfil</button>
            <button className="earnings-button">Ver Ganancias</button>
            <p>3 Publicaciones</p>
            <p>23 M Seguidores</p>
            <p>30 Seguidos</p>
            <h4>Romeo Santos</h4>
            <p className="bio">El chico de las poesías</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button className="tab-button active">Publicaciones</button>
          <button className="tab-button">Guardados</button>
        </div>

        {/* Posts Section */}
        <div className="profile-posts">
          <img src="/img/post1.jpg" alt="Post 1" className="post-thumbnail" />
          <img src="/img/post2.jpg" alt="Post 2" className="post-thumbnail" />
          <img src="/img/post3.jpg" alt="Post 3" className="post-thumbnail" />
        </div>

        {/* Music Player */}
        <div className="music-player">
          <img src="https://via.placeholder.com/50" alt="album cover" />
          <div>
            <h3>ODIO</h3>
            <p>Romeo Santos</p>
          </div>
          <div className="player-controls">
            ⏪ ⏯️ ⏩
          </div>
          <input type="range" min="0" max="100" />
        </div>
      </div>
    </div>
  );
};

export default Profile;

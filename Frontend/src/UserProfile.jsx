// src/UserProfile.jsx
import './HomeFeed.css';
import './UserProfile.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  return (
    <div className="home-feed">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>
          <Link to="/" className="logo">SPOTIGRAM</Link>
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
        <div className="user-profile-header">
          <img src="/img/romeo.jpeg" alt="Profile" className="user-profile-image" />
          <div className="user-profile-username">R.SANTOS</div>
          <div className="user-profile-details">
            <div className="user-profile-stats">
              <div className="stat-item">
                <span className="stat-value">3</span>
                <span className="stat-label"> Publicaciones</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">23 M</span>
                <span className="stat-label"> Seguidores</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">30</span>
                <span className="stat-label"> Seguidos</span>
              </div>
            </div>
            <div className="user-profile-bio">
              <h2>Romeo Santos</h2>
              <p>El chico de las poesías</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="user-profile-tabs">
          <button className="user-tab-button active">Publicaciones</button>
        </div>

        {/* Posts Section */}
        <div className="user-profile-posts">
          <img src="/img/post.jpg" alt="Post 1" className="user-post-thumbnail" />
          <img src="/img/post2.jpg" alt="Post 2" className="user-post-thumbnail" />
          <img src="/img/post3.jpg" alt="Post 3" className="user-post-thumbnail" />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

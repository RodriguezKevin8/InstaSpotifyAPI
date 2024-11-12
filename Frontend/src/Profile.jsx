// src/Profile.jsx
import './HomeFeed.css';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

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
        <div className="profile-header">
          <img src="/img/romeo.jpeg" alt="Profile" className="profile-image" />
          
          <div className="profile-details">
            <div className="profile-username">R.SANTOS</div> {/* Nombre de usuario */}
            <div className="profile-stats">
              <span><strong>3</strong> Publicaciones</span>
              <span><strong>23 M</strong> Seguidores</span>
              <span><strong>30</strong> Seguidos</span>
            </div>
            <div className="profile-name">
              <h4>Romeo Santos</h4>
              <p className="profile-bio">El chico de las poesías</p>
            </div>
          </div>

          <div className="profile-buttons">
            <button className="edit-button">Editar Perfil</button>
            <button className="earnings-button">Ver Ganancias</button>
            <button className="earnings-button" onClick={() => navigate('/create-post')}>Crear Publicacion</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button className="tab-button active">Publicaciones</button>
        </div>

        {/* Posts Section */}
        <div className="profile-posts">
          <img src="/img/post.jpg" alt="Post 1" className="post-thumbnail" />
          <img src="/img/post2.jpg" alt="Post 2" className="post-thumbnail" />
          <img src="/img/post3.jpg" alt="Post 3" className="post-thumbnail" />
        </div>
      </div>
    </div>
  );
};

export default Profile;

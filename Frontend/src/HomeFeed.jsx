// src/HomeFeed.jsx
import './HomeFeed.css';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import Stories from './stories';
import Post from './post';

const HomeFeed = () => {
  // Arreglo de datos de publicaciones
  const postsData = [
    { id: 1, avatar: "/img/drake.png", name: "DRAKE RAPPER", time: "1 hour ago", contentImage: "/img/drake.png" },
    { id: 2, avatar: "/img/pesopluma.png", name: "Peso Pluma", time: "2 hours ago", contentImage: "/img/pesopluma.png" },
    { id: 3, avatar: "/img/duki.png", name: "Duki", time: "3 hours ago", contentImage: "/img/duki.png" },
    { id: 4, avatar: "/img/eladio.png", name: "Eladio", time: "4 hours ago", contentImage: "/img/eladio.png" },
    { id: 5, avatar: "/img/BadBunny.jpg", name: "Bad Bunny", time: "5 hours ago", contentImage: "/img/BadBunny.jpg" },
    { id: 6, avatar: "/img/drake.png", name: "Drake", time: "6 hours ago", contentImage: "/img/drake.png" },
    { id: 7, avatar: "/img/pesopluma.png", name: "Peso Pluma", time: "7 hours ago", contentImage: "/img/pesopluma.png" }
  ];

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
        {/* Componente de Historias */}
        <Stories />

        {/* Renderizar múltiples posts */}
        <div className="posts-grid">
          {postsData.map((post) => (
            <div key={post.id} className="post-container">
              <Post
                avatar={post.avatar}
                name={post.name}
                time={post.time}
                contentImage={post.contentImage}
              />
            </div>
          ))}
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

export default HomeFeed;

// src/SpotigramProfile.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SpotigramProfile.css";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userResponse = JSON.parse(localStorage.getItem("user"));
    const userId = userResponse?.value?.id;

    if (userId) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/perfil/${userId}`);
          if (response.data.perfil) {
            setProfileData(response.data);
            setIsCreatingProfile(false);
          } else {
            setIsCreatingProfile(true);
          }
        } catch (error) {
          console.error("Error al obtener el perfil:", error);
          setIsCreatingProfile(true);
        }
      };

      const fetchUserPosts = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/publicacion/usuario/${userId}`);
          setUserPosts(response.data);
        } catch (error) {
          console.error("Error al obtener las publicaciones:", error);
        }
      };

      const fetchUserPlaylists = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/playlists?userId=${userId}`);
          setUserPlaylists(response.data);
        } catch (error) {
          console.error("Error al obtener las playlists:", error);
        }
      };

      fetchProfile();
      fetchUserPosts();
      fetchUserPlaylists();
    }
  }, []);

  return (
    <div className="container">
      <aside className="sidebar">
        <h2 className="title">SPOTIGRAM</h2>
        <nav className="menu">
          <Link to="/search">Buscar</Link>
          <Link to="/explore">Explorar</Link>
          <Link to="/notifications">Notificaciones</Link>
          <Link to="/music">Mi Música</Link>
        </nav>
      </aside>
      
      <main className="profile">
        {profileData ? (
          <div className="profile-info">
            <img
              src={profileData.perfil.avatar_url || "/img/default-avatar.jpg"}
              alt="profile"
              className="profile-pic"
            />
            <h3 className="username">{profileData.username || "Usuario"}</h3>
            <div className="stats">
              <span>{userPosts.length} Publicaciones</span>
              <span>{profileData._count.seguimiento_seguimiento_follower_idTousuario} Seguidores</span>
              <span>{profileData._count.seguimiento_seguimiento_followed_idTousuario} Seguidos</span>
            </div>
            <p className="bio">{profileData.perfil.bio || "Sin biografía"}</p>
          </div>
        ) : (
          <div className="profile-info">
            <h3 className="username">Crea tu perfil</h3>
            <button onClick={() => navigate("/crear-perfil")}>Crear Perfil</button>
          </div>
        )}

        <div className="actions">
          <button onClick={() => navigate("/editar-perfil")}>Editar Perfil</button>
          {profileData?.role === "Artista" && (
            <button onClick={() => navigate("/ganancias")}>Ver Ganancias</button>
          )}
          <button onClick={() => navigate("/create-post")}>Crear Publicación</button>
        </div>


        {/* Listado de Publicaciones del Usuario */}
        <section className="posts">
          <h3>Mis Publicaciones</h3>
          <div className="post-grid">
            {userPosts.map((post) => (
              <div key={post.id} className="post-item">
                <img src={post.content_url || "/img/default-image.jpg"} alt="post" />
                <p>{post.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;

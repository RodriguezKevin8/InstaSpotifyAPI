// src/Profile.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomeFeed.css";
import "./Profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // Estado para almacenar las publicaciones
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    birth_date: "",
    avatar: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el user_id desde localStorage
    const userResponse = JSON.parse(localStorage.getItem("user"));
    const userId = userResponse?.value?.id;

    if (userId) {
      // Llamada para obtener el perfil del usuario
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/perfil/${userId}`
          );
          if (response.data.perfil) {
            setProfileData(response.data); // El perfil existe
            setIsCreatingProfile(false);
          } else {
            setIsCreatingProfile(true); // El perfil no existe
          }
        } catch (error) {
          console.error("Error al obtener el perfil:", error);
          setIsCreatingProfile(true); // Mostrar formulario en caso de error
        }
      };

      // Llamada para obtener las publicaciones del usuario
      const fetchUserPosts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/publicacion/usuario/${userId}`
          );
          setUserPosts(response.data); // Guarda las publicaciones en el estado
        } catch (error) {
          console.error("Error al obtener las publicaciones:", error);
        }
      };

      fetchProfile();
      fetchUserPosts(); // Llamar a la función para obtener las publicaciones
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, avatar: e.target.files[0] }));
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    // Obtener el user_id desde localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.value?.id;

    const data = new FormData();
    data.append("bio", formData.bio);
    data.append("birth_date", formData.birth_date);
    data.append("avatar_url", formData.avatar); // Archivo de imagen
    data.append("usuario_id", userId); // Enviar usuario_id desde localStorage

    try {
      const response = await axios.post("http://localhost:3000/perfil", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error al crear el perfil:", error);
    }
  };

  return (
    <>
      <div className="home-feed">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>
            <Link to="/" className="logo">
              SPOTIGRAM
            </Link>
          </h2>
          <ul>
            <Link to="/search" className="icon-button">
              <img
                src="/icons/SearchIcon.svg"
                alt="Search Icon"
                className="search-icon"
              />
              <span className="icon-text">Buscar</span>
            </Link>
            <Link to="/explore" className="icon-button">
              <img
                src="/icons/ExploreIcon.svg"
                alt="Explore Icon"
                className="search-icon"
              />
              <span className="icon-text">Explorar</span>
            </Link>
            <Link to="/notifications" className="icon-button">
              <img
                src="/icons/NotificationsIcon.svg"
                alt="Notifications Icon"
                className="search-icon"
              />
              <span className="icon-text">Notificaciones</span>
            </Link>
            <Link to="/music" className="icon-button">
              <img
                src="/icons/MusicIcon.svg"
                alt="Music Icon"
                className="search-icon"
              />
              <span className="icon-text">Mi Música</span>
            </Link>
            <Link to="/profile" className="icon-button profile-button">
              <img
                src="/icons/UserIcon.svg"
                alt="Profile Icon"
                className="search-icon"
              />
              <span className="icon-text">Mi Perfil</span>
            </Link>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {profileData ? (
            // Mostrar perfil existente
            <div className="profile-header">
              <img
                src={profileData.perfil.avatar_url || "/img/default-avatar.jpg"}
                alt="Profile"
                className="profile-image"
              />
              <div className="profile-details">
                <div className="profile-username">
                  {profileData.username || "Usuario"}
                </div>
                <div className="profile-stats">
                  <span>
                    <strong>{userPosts.length}</strong> Publicaciones{" "}
                  </span>
                  <span>
                    <strong>
                      {
                        profileData._count
                          .seguimiento_seguimiento_follower_idTousuario
                      }
                    </strong>{" "}
                    Seguidores
                  </span>
                  <span>
                    <strong>
                      {
                        profileData._count
                          .seguimiento_seguimiento_followed_idTousuario
                      }
                    </strong>{" "}
                    Seguidos
                  </span>
                </div>
                <div className="profile-name">
                  <h4>{profileData.perfil.bio || "Nombre"}</h4>
                  <p className="profile-bio">
                    {profileData.perfil.bio || "Sin biografía"}
                  </p>
                </div>
              </div>
              <div className="profile-buttons">
                <button className="edit-button">Editar Perfil</button>
                {profileData.role === "Artista" && (
                  <button className="earnings-button">Ver Ganancias</button>
                )}
                <button
                  className="earnings-button"
                  onClick={() => navigate("/create-post")}
                >
                  Crear Publicación
                </button>
              </div>
            </div>
          ) : (
            // Mostrar formulario para crear perfil si no existe
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center mb-4">
                Crear Perfil
              </h2>
              <form onSubmit={handleCreateProfile} className="space-y-4">
                <input
                  type="text"
                  name="bio"
                  placeholder="Biografía"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="date"
                  name="birth_date"
                  placeholder="Fecha de Nacimiento"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="file"
                  name="avatar_url"
                  onChange={handleFileChange}
                  className="w-full"
                />
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Crear Perfil
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      {/* Mostrar las publicaciones del usuario */}
      <div>
        <h3>Publicaciones</h3>
        {userPosts.map((post) => (
          <div key={post.id}>
            <img
              src={post.content_url || "/img/default-image.jpg"}
              alt="Post"
            />
            <p>{post.descripcion}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profile;

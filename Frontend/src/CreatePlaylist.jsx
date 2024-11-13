// src/CreatePlaylist.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreatePlaylist.css";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const navigate = useNavigate();

  // Obtener el usuario_id desde localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.value?.id;

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", playlistName);
    formData.append("user_id", userId);
    formData.append("portada_url", coverImage);

    try {
      const response = await axios.post(
        "http://localhost:3000/playlist",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Playlist creada:", response.data);
      alert("Playlist creada con éxito");
      navigate("/playlist"); // Navegar de vuelta a la vista de playlist
    } catch (error) {
      console.error("Error al crear la playlist:", error);
      alert("Error al crear la playlist");
    }
  };

  return (
    <div className="create-playlist-container">
      <h2>Crear Nueva Playlist</h2>
      <form onSubmit={handleSubmit} className="create-playlist-form">
        <label htmlFor="playlistName">Nombre de la Playlist</label>
        <input
          type="text"
          id="playlistName"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          required
        />

        <label htmlFor="coverImage">Portada de la Playlist</label>
        <input
          type="file"
          id="coverImage"
          name="coverImage"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit" className="submit-button">
          Crear
        </button>
      </form>
    </div>
  );
};

export default CreatePlaylist;

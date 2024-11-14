// src/AllSongs.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AllSongs = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [songToAdd, setSongToAdd] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.value?.id;
  const { genreId } = useParams(); // Obtiene el género seleccionado desde la URL

  // Cargar las canciones de un género específico o todas si no hay género seleccionado
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const endpoint = genreId
          ? `http://localhost:3000/cancion/genero/${genreId}`
          : "http://localhost:3000/cancion/";
        const response = await axios.get(endpoint);
        setSongs(response.data);
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
      }
    };
    fetchSongs();
  }, [genreId]);

  // Función para abrir el modal y cargar las playlists del usuario
  const handleOpenModal = async (songId) => {
    setSongToAdd(songId);
    setShowModal(true);

    // Cargar las playlists del usuario cuando se abre el modal
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/playlist/user/${userId}`
        );
        setPlaylists(response.data);
      } catch (error) {
        console.error("Error al obtener las playlists del usuario:", error);
      }
    }
  };

  const handleAddToPlaylist = async () => {
    if (!selectedPlaylist) {
      alert("Selecciona una playlist antes de añadir la canción.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/playlist/${selectedPlaylist}/song`,
        {
          cancionId: Number(songToAdd),
        }
      );
      setModalMessage("Canción añadida a la playlist!");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setModalMessage("La canción ya está en la playlist.");
      } else {
        console.error("Error al añadir la canción a la playlist:", error);
        setModalMessage("Hubo un problema al añadir la canción a la playlist.");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlaylist(null);
    setSongToAdd(null);
    setModalMessage("");
  };

  return (
    <div className="all-songs-container max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Canciones del Género Seleccionado
      </h2>

      {/* Lista de canciones */}
      <div className="max-h-96 overflow-y-auto bg-gray-900 p-4 rounded-lg shadow-lg">
        {songs.length > 0 ? (
          <ul className="space-y-4">
            {songs.map((song) => (
              <li
                key={song.id}
                className="p-4 bg-gray-800 rounded-lg flex flex-col space-y-2"
              >
                <h3 className="text-lg font-semibold text-white">
                  {song.title}
                </h3>
                <img
                  src={song.portada_url}
                  alt={song.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <p className="text-gray-400">Artista ID: {song.artist_id}</p>
                <p className="text-gray-400">Álbum ID: {song.album_id}</p>
                <a
                  href={song.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Escuchar
                </a>
                <button
                  onClick={() => handleOpenModal(song.id)}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md"
                >
                  Añadir a la Playlist
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            No hay canciones disponibles para este género.
          </p>
        )}
      </div>

      {/* Modal para añadir a playlist */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-xl font-bold mb-4">
              {modalMessage || "Selecciona una Playlist"}
            </h3>

            {modalMessage ? (
              <button
                onClick={closeModal}
                className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
              >
                Cerrar
              </button>
            ) : (
              <>
                <select
                  className="mb-4 p-2 border rounded w-full"
                  value={selectedPlaylist || ""}
                  onChange={(e) => setSelectedPlaylist(Number(e.target.value))}
                >
                  <option value="">Selecciona una Playlist</option>
                  {playlists.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>
                      {playlist.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={handleAddToPlaylist}
                  className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 w-full"
                >
                  Confirmar
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600 w-full mt-2"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllSongs;

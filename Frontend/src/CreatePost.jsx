// src/CreatePost.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreatePost.css";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [descripcion, setDescripcion] = useState(""); // Asegúrate de usar `descripcion` aquí
  const navigate = useNavigate();

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Guardar el archivo de imagen seleccionado
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener usuario_id del localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const usuarioId = user?.value?.id;

    if (!usuarioId) {
      alert("Usuario no identificado");
      return;
    }

    // Crear un FormData para enviar la imagen y descripción
    const formData = new FormData();
    formData.append("content_url", image); // Enviar el archivo de imagen
    formData.append("descripcion", descripcion); // Enviar la descripción
    formData.append("user_id", usuarioId); // Enviar el ID del usuario

    // Comprobar que `descripcion` esté en el FormData
    console.log("Contenido de `descripcion` en FormData:", formData.get("descripcion")); 

    try {
      // Hacer la solicitud POST a la API de creación de publicación
      const response = await axios.post(
        "http://localhost:3000/publicacion",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Publicación creada:", response.data);
      // Navegar de regreso al perfil o al feed después de crear la publicación
      navigate("/profile");
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      alert("Hubo un error al crear la publicación.");
    }
  };

  return (
    <div className="create-post">
      <h2>Crear Publicación</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image-upload" className="image-label">
          Selecciona una imagen
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Vista previa"
            className="preview-image"
          />
        )}

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Escribe una descripción..."
          required
        />

        <button type="submit" className="submit-button">
          Publicar
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

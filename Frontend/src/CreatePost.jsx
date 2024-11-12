// src/CreatePost.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
	const [image, setImage] = useState(null);
	const [description, setDescription] = useState("");
	const navigate = useNavigate();

	const handleImageChange = (e) => {
		setImage(URL.createObjectURL(e.target.files[0]));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Aquí puedes manejar la lógica de envío para guardar la imagen y descripción.
		console.log("Publicación creada:", { image, description });
		// Navegar de regreso al perfil o al feed
		navigate("/profile");
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
					<img src={image} alt="Vista previa" className="preview-image" />
				)}

				<label htmlFor="description">Descripción</label>
				<textarea
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
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

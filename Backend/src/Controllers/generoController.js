// src/Controllers/generoController.js
import {
  createGenero,
  getAllGeneros,
  getGeneroById,
  updateGenero,
  deleteGenero,
} from "../Models/generoModel.js";

// Obtener todos los géneros
export const getGeneros = async (req, res) => {
  try {
    const generos = await getAllGeneros();
    res.status(200).json(generos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un género por ID
export const getGenero = async (req, res) => {
  try {
    const genero = await getGeneroById(req.params.id);
    if (!genero) {
      return res.status(404).json({ error: "Género no encontrado" });
    }
    res.status(200).json(genero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo género con una imagen en Cloudinary
export const createNewGenero = async (req, res) => {
  try {
    const { nombre } = req.body;

    // La URL de la imagen subida a Cloudinary se almacena en `req.file.path`
    const portada_url = req.file ? req.file.path : null; // Verificamos si hay una imagen

    const newGenero = await createGenero({ nombre, portada_url });
    res.status(201).json(newGenero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un género existente
export const updateExistingGenero = async (req, res) => {
  try {
    const { nombre } = req.body;
    const portada_url = req.file ? req.file.path : null; // Nueva URL si hay imagen

    const dataToUpdate = { nombre };
    if (portada_url) dataToUpdate.portada_url = portada_url; // Solo actualizar la portada si se envía una imagen nueva

    const updatedGenero = await updateGenero(req.params.id, dataToUpdate);
    res.status(200).json(updatedGenero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un género
export const deleteExistingGenero = async (req, res) => {
  try {
    await deleteGenero(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

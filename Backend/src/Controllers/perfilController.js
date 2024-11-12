// src/Controllers/perfilController.js
import {
  createPerfil,
  getPerfilByUserId,
  updatePerfil,
  deletePerfil,
} from "../Models/perfilModel.js";

// Crear un nuevo perfil con avatar en Cloudinary y recibir la fecha desde el cuerpo de la solicitud
export const createPerfilController = async (req, res) => {
  try {
    const perfilData = {
      bio: req.body.bio,
      avatar_url: req.file ? req.file.path : null, // URL del avatar desde Cloudinary
      birth_date: req.body.birth_date ? new Date(req.body.birth_date) : null, // Fecha de nacimiento enviada desde el cliente
      usuario: {
        connect: { id: parseInt(req.body.usuario_id) },
      },
    };

    const newPerfil = await createPerfil(perfilData);
    res.status(201).json(newPerfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un perfil por ID de usuario
export const getPerfilByUserIdController = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const perfil = await getPerfilByUserId(userId);
    if (!perfil) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }
    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un perfil y recibir la fecha desde el cuerpo de la solicitud
export const updatePerfilController = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const perfilData = {
      bio: req.body.bio,
      avatar_url: req.file ? req.file.path : req.body.avatar_url, // Actualizar solo si se proporciona un archivo nuevo
      birth_date: req.body.birth_date ? new Date(req.body.birth_date) : null, // Fecha de nacimiento enviada desde el cliente
    };
    const updatedPerfil = await updatePerfil(userId, perfilData);
    res.status(200).json(updatedPerfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un perfil
export const deletePerfilController = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    await deletePerfil(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import {
  createSeguimiento,
  deleteSeguimiento,
  getSeguidosYSeguidoresCount,
  checkSeguimiento, // Asegúrate de importar la función aquí
} from "../Models/seguimientoModel.js";

export const createSeguimientoController = async (req, res) => {
  try {
    const { follower_id, followed_id } = req.body;

    if (!follower_id || !followed_id || follower_id === followed_id) {
      return res.status(400).json({ message: "Datos inválidos." });
    }

    const response = await createSeguimiento({ follower_id, followed_id });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSeguimientoController = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const response = await getSeguidosYSeguidoresCount(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSeguimientoController = async (req, res) => {
  try {
    const { follower_id, followed_id } = req.body;

    if (!follower_id || !followed_id) {
      return res.status(400).json({ message: "Datos inválidos." });
    }

    const response = await deleteSeguimiento(follower_id, followed_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Nuevo controlador para verificar si un usuario sigue a otro
export const checkSeguimientoController = async (req, res) => {
  try {
    const { followerId, followedId } = req.params;

    if (!followerId || !followedId) {
      return res.status(400).json({ message: "Datos inválidos." });
    }

    const isFollowing = await checkSeguimiento(
      parseInt(followerId),
      parseInt(followedId)
    );
    res.status(200).json({ isFollowing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

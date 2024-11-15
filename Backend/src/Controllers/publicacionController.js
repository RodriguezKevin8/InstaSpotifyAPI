import {
  createPublicacion,
  deletePublicacion,
  getallpublicaciones,
  getPublicacionesByUsuarioId,
} from "../Models/publicacionModel.js";

export const getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await getallpublicaciones();
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewPublicacion = async (req, res) => {
  try {
    const data = {
      description: req.body.description,
      content_url: req.file ? req.file.path : null,
      user_id: req.body.user_id ? parseInt(req.body.user_id) : null,
    };
    const newPublicacion = await createPublicacion(data);
    res.status(201).json(newPublicacion);
  } catch (error) {
    console.error(
      "Error en createNewPublicacion:",
      JSON.stringify(error, null, 2)
    );
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getPublicacionesByUsuarioController = async (req, res) => {
  try {
    const usuarioId = parseInt(req.params.usuarioId);
    const publicaciones = await getPublicacionesByUsuarioId(usuarioId);

    if (!publicaciones || publicaciones.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron publicaciones para este usuario" });
    }

    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExistingPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPublicacion = await deletePublicacion(id);
    res.status(200).json(deletedPublicacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFollowedPublicaciones = async (req, res) => {
  try {
    const { id } = parseInt(req.params.id);
    const publicaciones = await getallpublicaciones(id);
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

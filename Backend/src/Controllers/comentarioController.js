import {
  createComentario,
  getAllComentarios,
  deleteComentario,
} from "../Models/comentarioModel.js";

export const createComentarios = async (req, res) => {
  try {
    const data = {
      texto: req.body.texto,
      usuario_id: parseInt(req.body.usuario_id),
      publicacion_id: parseInt(req.body.publicacion_id),
    };

    const newComentario = await createComentario(data);
    res.status(201).json(newComentario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getComentarios = async (req, res) => {
  try {
    const comentarios = await getAllComentarios(req.params.id);
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteComentarios = async (req, res) => {
  try {
    const deletedComentarios = await deleteComentario(req.params.id);
    if (!deletedComentarios) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }
    res.status(200).json(deletedComentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

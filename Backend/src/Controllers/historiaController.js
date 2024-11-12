import {
  createHistoria,
  getHistoriaById,
  deleteHistoria,
} from "../Models/historiaModel.js";

export const createNewHistoria = async (req, res) => {
  try {
    const data = {
      content_url: req.file ? req.file.path : null,
      descripcion: req.body.descripcion,
      created_at: new Date(),
      user_id: parseInt(req.body.user_id),
      cancion_id: parseInt(req.body.cancion_id),
    };

    const newHistoria = await createHistoria(data);
    res.status(201).json(newHistoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getHistoria = async (req, res) => {
  try {
    const historia = await getHistoriaById(req.params.id);
    if (!historia) {
      return res.status(404).json({ error: "Historia no encontrada" });
    }
    res.status(200).json(historia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHistorias = async (req, res) => {
  try {
    const deletedHistoria = await deleteHistoria(req.params.id);
    res.status(200).json(deletedHistoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

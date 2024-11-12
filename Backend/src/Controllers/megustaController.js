import {
  createMegusta,
  getAllMegusta,
  deleteMegusta,
} from "../Models/megustaModel.js";

export const createMegustas = async (req, res) => {
  try {
    const data = {
      user_id: parseInt(req.body.user_id),
      publicacion_id: parseInt(req.body.publicacion_id),
      cancion_id: parseInt(req.body.cancion_id),
    };
    const newMegusta = await createMegusta(data);
    res.status(201).json(newMegusta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMegustas = async (req, res) => {
  try {
    const megustas = await getAllMegusta(req.params.id);
    res.status(200).json(megustas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMegustas = async (req, res) => {
  try {
    const deletedMegustas = await deleteMegusta(req.params.id);
    if (!deletedMegustas) {
      return res.status(404).json({ error: "Me gusta no encontrado" });
    }
    res.status(200).json(deletedMegustas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import {
  createSeguimiento,
  getSeguimiento,
  deleteSeguimiento,
} from "../Models/seguimientoModel.js";

export const createSeguimientoController = async (req, res) => {
  try {
    const data = req.body;
    const response = await createSeguimiento(data);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getSeguimientoController = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await getSeguimiento(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteSeguimientoController = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await deleteSeguimiento(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

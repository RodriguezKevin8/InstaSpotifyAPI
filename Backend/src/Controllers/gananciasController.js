// src/Controllers/gananciasController.js
import {
  getGananciasByUserId,
  incrementarGananciasPorReproduccion,
  incrementarGananciasPorAnuncio,
} from "../Models/gananciasModel.js";

export const getGanancias = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10); // Convertir userId a entero
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ error: "ID de usuario debe ser un número válido" });
    }
    const ganancias = await getGananciasByUserId(userId);
    res.status(200).json(ganancias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addGananciasPorReproduccion = async (req, res) => {
  try {
    const updatedGanancias = await incrementarGananciasPorReproduccion(
      req.body.userId
    );
    res.status(200).json(updatedGanancias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addGananciasPorAnuncio = async (req, res) => {
  try {
    const updatedGanancias = await incrementarGananciasPorAnuncio(
      req.body.userId,
      req.body.monto
    );
    res.status(200).json(updatedGanancias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

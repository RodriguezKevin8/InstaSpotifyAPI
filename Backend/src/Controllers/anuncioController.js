// src/Controllers/anuncioController.js
import {
  createAnuncio,
  incrementarInteraccionEnAnuncio,
} from "../Models/anuncioModel.js";

export const createNewAnuncio = async (req, res) => {
  try {
    const newAnuncio = await createAnuncio(req.body);
    res.status(201).json(newAnuncio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementarMontoPorInteraccion = async (req, res) => {
  try {
    const anuncioId = parseInt(req.params.anuncioId, 10); // Convertir anuncioId a entero
    const monto = parseFloat(req.body.monto); // Asegura que sea un número decimal
    if (isNaN(anuncioId) || isNaN(monto)) {
      return res
        .status(400)
        .json({ error: "ID de anuncio y monto deben ser valores válidos" });
    }
    const updatedAnuncio = await incrementarInteraccionEnAnuncio(
      anuncioId,
      monto
    );
    res.status(200).json(updatedAnuncio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

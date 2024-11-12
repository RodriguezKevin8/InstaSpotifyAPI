// src/Routes/anuncio.js
import express from "express";
import {
  createNewAnuncio,
  incrementarMontoPorInteraccion,
} from "../Controllers/anuncioController.js";

const router = express.Router();

router.post("/", createNewAnuncio); // Crear un nuevo anuncio
router.post("/:anuncioId/interaccion", incrementarMontoPorInteraccion); // Registrar una interacción en anuncio

export default router;

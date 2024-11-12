// src/Routes/anuncio.js
import express from "express";
import {
  createNewAnuncio,
  incrementarMontoPorInteraccion,
  getAllAnuncios,
  getRandomAnuncios,
} from "../Controllers/anuncioController.js";

const router = express.Router();

router.get("/", getAllAnuncios);
router.get("/random", getRandomAnuncios);
router.post("/", createNewAnuncio); // Crear un nuevo anuncio
router.post("/:anuncioId/interaccion", incrementarMontoPorInteraccion); // Registrar una interacción en anuncio

export default router;

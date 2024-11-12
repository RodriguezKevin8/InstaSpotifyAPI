// src/Routes/ganancias.js
import express from "express";
import {
  getGanancias,
  addGananciasPorReproduccion,
  addGananciasPorAnuncio,
} from "../Controllers/gananciasController.js";

const router = express.Router();

router.get("/:userId", getGanancias); // Obtener el total de ganancias de un usuario
router.post("/reproduccion", addGananciasPorReproduccion); // Agregar ganancias por reproducción (opcional)
router.post("/anuncio", addGananciasPorAnuncio); // Agregar ganancias por anuncio (opcional)

export default router;

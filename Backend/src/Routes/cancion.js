// src/Routes/cancion.js
import express from "express";
import upload from "../config/multer.js";
import {
  getCanciones,
  getCancion,
  createNewCancion,
  updateExistingCancion,
  deleteExistingCancion,
  incrementarReproduccion,
} from "../Controllers/cancionController.js";

const router = express.Router();

router.get("/", getCanciones); // Obtener todas las canciones
router.get("/:id", getCancion); // Obtener una canción por ID

// Cambia los nombres a "file_url" y "portada_url" para que coincidan con el controlador
router.post(
  "/",
  upload.fields([
    { name: "file_url", maxCount: 1 },
    { name: "portada_url", maxCount: 1 },
  ]),
  createNewCancion
); // Crear una nueva canción

router.put(
  "/:id",
  upload.fields([
    { name: "file_url", maxCount: 1 },
    { name: "portada_url", maxCount: 1 },
  ]),
  updateExistingCancion
); // Actualizar una canción por ID

router.delete("/:id", deleteExistingCancion); // Eliminar una canción por ID
router.post("/:cancionId/reproduccion", incrementarReproduccion);

export default router;

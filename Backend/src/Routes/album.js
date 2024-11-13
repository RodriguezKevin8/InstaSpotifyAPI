// src/Routes/album.js
import express from "express";
import upload from "../config/multer.js";
import {
  getAlbums,
  getAlbum,
  createNewAlbum,
  updateExistingAlbum,
  deleteExistingAlbum,
  getAlbumsByArtist,
} from "../Controllers/albumController.js";

const router = express.Router();

router.get("/", getAlbums); // Obtener todos los álbumes
router.get("/:id", getAlbum); // Obtener un álbum por ID
router.post("/", upload.single("portada_url"), createNewAlbum); // Crear un nuevo álbum con portada
router.put("/:id", upload.single("portada_url"), updateExistingAlbum); // Actualizar un álbum con nueva portada si se sube
router.delete("/:id", deleteExistingAlbum); // Eliminar un álbum por ID
router.get("/usuario/:id", getAlbumsByArtist);

export default router;

// src/Routes/playlist.js
import express from "express";
import upload from "../config/multer.js"; // Importar la configuración de Multer
import {
  getPlaylists,
  getPlaylist,
  createNewPlaylist,
  addSong,
  removeSong,
  deleteExistingPlaylist,
  getPlaylistsByUser,
} from "../Controllers/playlistController.js";

const router = express.Router();

router.get("/:userId", getPlaylists); // Obtener todas las playlists de un usuario
router.get("/:id", getPlaylist); // Obtener una playlist por ID

// Agregar la portada a Cloudinary al crear una playlist
router.post("/", upload.single("portada_url"), createNewPlaylist); // Crear una nueva playlist con portada

router.post("/:playlistId/song", addSong); // Agregar una canción a una playlist
router.delete("/:playlistId/song", removeSong); // Eliminar una canción de una playlist
router.delete("/:id", deleteExistingPlaylist); // Eliminar una playlist
router.get("/user/:userId", getPlaylistsByUser);

export default router;

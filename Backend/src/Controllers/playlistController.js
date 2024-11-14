// src/Controllers/playlistController.js
import {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
  getUserPlaylists,
  getPlaylistDetailsById,
} from "../Models/playlistModel.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPlaylists = async (req, res) => {
  try {
    const playlists = await getAllPlaylists(req.params.userId);
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlaylist = async (req, res) => {
  try {
    const playlist = await getPlaylistById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist no encontrada" });
    }
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewPlaylist = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Falta el archivo de portada" });
    }

    const data = {
      name: req.body.name,
      portada_url: req.file.path, // URL de la portada desde Cloudinary
      user_id: parseInt(req.body.user_id),
    };

    const newPlaylist = await createPlaylist(data);
    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addSong = async (req, res) => {
  try {
    const playlistId = parseInt(req.params.playlistId, 10);
    const cancionId = parseInt(req.body.cancionId, 10);

    // Verificar si la canción ya está en la playlist
    const existingEntry = await prisma.playlistcancion.findUnique({
      where: {
        playlist_id_cancion_id: {
          playlist_id: Number(playlistId),
          cancion_id: Number(cancionId),
        },
      },
    });
    if (existingEntry) {
      return res
        .status(409)
        .json({ error: "La canción ya está en la playlist." });
    }

    // Si no está, la añadimos
    const addedSong = await addSongToPlaylist(playlistId, cancionId);
    res.status(201).json(addedSong);
  } catch (error) {
    console.error("Error en el controlador addSong:", error);
    res.status(500).json({ error: error.message });
  }
};

export const removeSong = async (req, res) => {
  try {
    await removeSongFromPlaylist(req.params.playlistId, req.body.cancionId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExistingPlaylist = async (req, res) => {
  try {
    await deletePlaylist(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlaylistsByUser = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const playlists = await getUserPlaylists(userId);
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlaylistDetails = async (req, res) => {
  try {
    const playlistId = parseInt(req.params.playlistId, 10);
    const playlist = await getPlaylistDetailsById(playlistId);

    if (!playlist) {
      return res.status(404).json({ error: "Playlist no encontrada" });
    }

    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error en getPlaylistDetails:", error);
    res.status(500).json({ error: error.message });
  }
};

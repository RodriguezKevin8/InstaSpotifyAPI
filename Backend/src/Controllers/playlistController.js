// src/Controllers/playlistController.js
import {
  getAllPlaylists,
  getPlaylistById,
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
} from "../Models/playlistModel.js";

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
    const addedSong = await addSongToPlaylist(
      req.params.playlistId,
      req.body.cancionId
    );
    res.status(201).json(addedSong);
  } catch (error) {
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

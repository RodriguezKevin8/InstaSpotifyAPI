// src/Controllers/albumController.js
import {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "../Models/albumModel.js";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAlbums = async (req, res) => {
  try {
    const albums = await getAllAlbums();
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAlbumsByArtist = async (req, res) => {
  const artistId = parseInt(req.params.id);

  try {
    const albums = await prisma.album.findMany({
      where: { artist_id: artistId },
      include: {
        cancion: true, // Incluye las canciones relacionadas con el álbum
        usuario: { select: { nombre: true } }, // Incluye solo el nombre del usuario (artista)
      },
    });
    res.status(200).json(albums);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los álbumes del artista." });
  }
};

// src/Controllers/albumController.js
export const getAlbum = async (req, res) => {
  try {
    const album = await getAlbumById(req.params.id);
    if (!album) {
      return res.status(404).json({ error: "Álbum no encontrado" });
    }
    res.status(200).json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewAlbum = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      portada_url: req.file ? req.file.path : null,
      artist_id: parseInt(req.body.artist_id),
    };

    const newAlbum = await createAlbum(data);
    res.status(201).json(newAlbum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExistingAlbum = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      portada_url: req.file ? req.file.path : req.body.portada_url,
      release_date: req.body.release_date
        ? new Date(req.body.release_date)
        : null,
      artist_id: parseInt(req.body.artist_id),
    };

    const updatedAlbum = await updateAlbum(req.params.id, data);
    res.status(200).json(updatedAlbum);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExistingAlbum = async (req, res) => {
  try {
    await deleteAlbum(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

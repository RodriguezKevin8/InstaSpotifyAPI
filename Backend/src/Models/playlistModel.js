// src/Models/playlistModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las playlists de un usuario
export const getAllPlaylists = async (userId) => {
  return await prisma.playlist.findMany({
    where: { user_id: userId },
    include: {
      playlistcancion: {
        include: { cancion: true },
      },
    },
  });
};

// Obtener una playlist por ID
export const getPlaylistById = async (id) => {
  return await prisma.playlist.findUnique({
    where: { id: parseInt(id) },
    include: {
      playlistcancion: {
        include: { cancion: true },
      },
    },
  });
};

// Crear una nueva playlist
export const createPlaylist = async (data) => {
  return await prisma.playlist.create({
    data: {
      name: data.name,
      portada_url: data.portada_url,
      user_id: data.user_id,
    },
  });
};

export const addSongToPlaylist = async (playlistId, cancionId) => {
  return await prisma.playlistcancion.create({
    data: {
      playlist_id: playlistId,
      cancion_id: cancionId,
    },
  });
};

// Eliminar canción de playlist
export const removeSongFromPlaylist = async (playlistId, cancionId) => {
  return await prisma.playlistcancion.delete({
    where: {
      playlist_id_cancion_id: {
        playlist_id: playlistId,
        cancion_id: cancionId,
      },
    },
  });
};

// Eliminar playlist
export const deletePlaylist = async (id) => {
  return await prisma.playlist.delete({
    where: { id: parseInt(id) },
  });
};

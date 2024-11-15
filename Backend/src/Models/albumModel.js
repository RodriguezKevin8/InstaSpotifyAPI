// src/Models/albumModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllAlbums = async () => {
  return await prisma.album.findMany({
    include: {
      cancion: true, // Incluye las canciones relacionadas con el álbum
      usuario: true, // Incluye el artista que creó el álbum
    },
  });
};

// src/Models/albumModel.js
export const getAlbumById = async (id) => {
  return await prisma.album.findUnique({
    where: { id: parseInt(id) },
    include: {
      cancion: {
        include: {
          usuario: { select: { nombre: true } }, // Incluye el nombre del artista (usuario) de cada canción
        },
      },
      usuario: { select: { nombre: true } }, // Incluye el nombre del artista principal del álbum
    },
  });
};

export const createAlbum = async (data) => {
  return await prisma.album.create({
    data: {
      title: data.title,
      portada_url: data.portada_url,
      artist_id: data.artist_id,
    },
  });
};

export const updateAlbum = async (id, data) => {
  return await prisma.album.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      portada_url: data.portada_url,
      release_date: data.release_date,
      artist_id: data.artist_id,
    },
  });
};

export const deleteAlbum = async (id) => {
  return await prisma.album.delete({
    where: { id: parseInt(id) },
  });
};

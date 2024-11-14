// src/Models/cancionModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las canciones
export const getAllCanciones = async () => {
  return await prisma.cancion.findMany({
    include: {
      genero: true,
      album: true,
      usuario: true,
    },
  });
};

export const getCancionesByGenero = async (genreId) => {
  return await prisma.cancion.findMany({
    where: { genre_id: Number(genreId) },
    include: {
      genero: true,
      album: {
        select: {
          title: true, // Selecciona solo el nombre del álbum
        },
      },
      usuario: {
        select: {
          nombre: true, // Selecciona solo el nombre del usuario
        },
      },
    },
  });
};

// Obtener una canción por ID
export const getCancionById = async (id) => {
  return await prisma.cancion.findUnique({
    where: { id: parseInt(id) },
    include: {
      genero: true,
      album: true,
      usuario: true,
    },
  });
};

// Crear una nueva canción
export const createCancion = async (data) => {
  return await prisma.cancion.create({
    data: {
      title: data.title,
      genre_id: data.genre_id,
      album_id: data.album_id,
      artist_id: data.artist_id,
      file_url: data.file_url,
      portada_url: data.portada_url,
    },
  });
};

// Actualizar una canción
export const updateCancion = async (id, data) => {
  return await prisma.cancion.update({
    where: { id: parseInt(id) },
    data: {
      title: data.title,
      genre_id: data.genre_id,
      album_id: data.album_id,
      artist_id: data.artist_id,
      file_url: data.file_url,
      portada_url: data.portada_url,
      release_date: data.release_date,
      reproducciones: data.reproducciones,
    },
  });
};

// Eliminar una canción
export const deleteCancion = async (id) => {
  return await prisma.cancion.delete({
    where: { id: parseInt(id) },
  });
};

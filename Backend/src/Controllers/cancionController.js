// src/Controllers/cancionController.js
import {
  getAllCanciones,
  getCancionById,
  createCancion,
  updateCancion,
  deleteCancion,
} from "../Models/cancionModel.js";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
export const getCanciones = async (req, res) => {
  try {
    const canciones = await getAllCanciones();
    res.status(200).json(canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCancion = async (req, res) => {
  try {
    const cancion = await getCancionById(req.params.id);
    if (!cancion) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }
    res.status(200).json(cancion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// src/Controllers/cancionController.js
export const createNewCancion = async (req, res) => {
  try {
    console.log("Archivos recibidos:", req.files); // Verificar si los archivos están siendo recibidos correctamente

    if (!req.files || !req.files.file_url || !req.files.portada_url) {
      return res.status(400).json({
        error: "Faltan archivos necesarios: file_url y/o portada_url",
      });
    }

    const data = {
      title: req.body.title,
      genre_id: req.body.genre_id ? parseInt(req.body.genre_id) : null,
      album_id: req.body.album_id ? parseInt(req.body.album_id) : null,
      artist_id: req.body.artist_id ? parseInt(req.body.artist_id) : null,
      file_url: req.files.file_url[0].path, // URL del archivo de audio de Cloudinary
      portada_url: req.files.portada_url[0].path, // URL de la portada de Cloudinary
    };

    console.log("Datos para creación de canción:", data); // Verificar los datos antes de crear la canción

    const newCancion = await createCancion(data);
    console.log("Canción creada:", newCancion); // Verificar el resultado de la creación

    res.status(201).json(newCancion);
  } catch (error) {
    // Serializar el error completo en JSON para verlo en detalle
    console.error("Error en createNewCancion:", JSON.stringify(error, null, 2));
    res.status(500).json({
      error: error.message,
      details: JSON.parse(JSON.stringify(error)),
    });
  }
};

export const updateExistingCancion = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      genre_id: req.body.genre_id ? parseInt(req.body.genre_id) : null,
      album_id: req.body.album_id ? parseInt(req.body.album_id) : null,
      artist_id: req.body.artist_id ? parseInt(req.body.artist_id) : null,
      file_url: req.files.file_url
        ? req.files.file_url[0].path
        : req.body.file_url,
      portada_url: req.files.portada_url
        ? req.files.portada_url[0].path
        : req.body.portada_url,
      release_date: req.body.release_date,
      reproducciones: req.body.reproducciones,
    };

    const updatedCancion = await updateCancion(req.params.id, data);
    res.status(200).json(updatedCancion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExistingCancion = async (req, res) => {
  try {
    await deleteCancion(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementarReproduccion = async (req, res) => {
  try {
    const cancionId = parseInt(req.params.cancionId, 10);
    if (isNaN(cancionId)) {
      return res
        .status(400)
        .json({ error: "ID de la canción debe ser un número válido" });
    }

    // Obtener la canción y su artista
    const cancion = await prisma.cancion.findUnique({
      where: { id: cancionId },
      select: {
        artist_id: true, // ID del artista
        reproducciones: true, // Número actual de reproducciones
      },
    });

    if (!cancion) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    // Incrementar reproducciones de la canción
    await prisma.cancion.update({
      where: { id: cancionId },
      data: {
        reproducciones: {
          increment: 1,
        },
      },
    });

    // Incremento de ganancias por cada reproducción
    const montoPorReproduccion = new Prisma.Decimal(0.01);

    // Actualizar las ganancias del artista en la tabla ganancias
    await prisma.ganancias.updateMany({
      where: { usuario_id: cancion.artist_id },
      data: {
        ganancias_por_cancion: {
          increment: montoPorReproduccion,
        },
        total_ganancias: {
          increment: montoPorReproduccion,
        },
        total_reproducciones: {
          increment: 1,
        },
      },
    });

    res.status(200).json({
      message: "Reproducción registrada y ganancias actualizadas",
      incremento: montoPorReproduccion.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

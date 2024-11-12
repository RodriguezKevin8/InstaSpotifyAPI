// src/Controllers/anuncioController.js
import {
  createAnuncio,
  incrementarInteraccionEnAnuncio,
} from "../Models/anuncioModel.js";

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const createNewAnuncio = async (req, res) => {
  try {
    const newAnuncio = await createAnuncio(req.body);
    res.status(201).json(newAnuncio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const incrementarMontoPorInteraccion = async (req, res) => {
  try {
    const anuncioId = parseInt(req.params.anuncioId, 10); // Convertir anuncioId a entero
    const monto = parseFloat(req.body.monto); // Asegura que sea un número decimal
    if (isNaN(anuncioId) || isNaN(monto)) {
      return res
        .status(400)
        .json({ error: "ID de anuncio y monto deben ser valores válidos" });
    }
    const updatedAnuncio = await incrementarInteraccionEnAnuncio(
      anuncioId,
      monto
    );
    res.status(200).json(updatedAnuncio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para obtener todos los anuncios
export const getAllAnuncios = async (req, res) => {
  try {
    const anuncios = await prisma.anuncio.findMany();
    res.status(200).json(anuncios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRandomAnuncios = async (req, res) => {
  try {
    const anuncios =
      await prisma.$queryRaw`SELECT * FROM "anuncio" ORDER BY RANDOM() LIMIT 5`;
    res.status(200).json(anuncios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

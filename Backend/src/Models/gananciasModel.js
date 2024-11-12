// src/Models/gananciasModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGananciasByUserId = async (userId) => {
  return await prisma.ganancias.findFirst({
    where: { usuario_id: userId }, // `userId` ahora es un número entero
  });
};

// Actualizar ganancias por reproducción manualmente (por si se necesita una opción manual)
export const incrementarGananciasPorReproduccion = async (userId) => {
  return await prisma.ganancias.update({
    where: { usuario_id: userId },
    data: {
      ganancias_por_cancion: {
        increment: 0.01,
      },
      total_ganancias: {
        increment: 0.01,
      },
      total_reproducciones: {
        increment: 1,
      },
    },
  });
};

// Actualizar ganancias por interacción en anuncio manualmente
export const incrementarGananciasPorAnuncio = async (userId, monto) => {
  return await prisma.ganancias.update({
    where: { usuario_id: userId },
    data: {
      ganancias_por_anuncio: {
        increment: monto,
      },
      total_ganancias: {
        increment: monto,
      },
    },
  });
};

// src/Models/anuncioModel.js
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un nuevo anuncio
export const createAnuncio = async (data) => {
  return await prisma.anuncio.create({
    data: {
      descripcion: data.descripcion,
      monto_ganado: data.monto_ganado || 0,
      activo: data.activo || true,
      usuario_id: data.usuario_id,
    },
  });
};

// Incrementar monto de anuncio tras una interacción
export const incrementarInteraccionEnAnuncio = async (anuncioId, monto) => {
  return await prisma.anuncio.update({
    where: { id: anuncioId },
    data: {
      monto_ganado: {
        increment: new Prisma.Decimal(monto), // Utilizar Prisma.Decimal para el monto
      },
    },
  });
};

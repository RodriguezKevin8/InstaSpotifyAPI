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
  // Actualizar el monto ganado en el anuncio
  await prisma.anuncio.update({
    where: { id: anuncioId },
    data: {
      monto_ganado: {
        increment: new Prisma.Decimal(monto),
      },
    },
  });

  // Obtener el usuario asociado al anuncio
  const anuncio = await prisma.anuncio.findUnique({
    where: { id: anuncioId },
    select: { usuario_id: true }, // Solo necesitamos el usuario_id
  });

  if (anuncio && anuncio.usuario_id) {
    // Asegurarse de que el usuario tiene una entrada en ganancias antes de intentar actualizar
    const gananciasExistentes = await prisma.ganancias.findFirst({
      where: { usuario_id: anuncio.usuario_id },
    });

    if (gananciasExistentes) {
      // Actualizar las ganancias del usuario en la tabla `ganancias`
      await prisma.ganancias.updateMany({
        where: { usuario_id: anuncio.usuario_id },
        data: {
          ganancias_por_anuncio: {
            increment: new Prisma.Decimal(monto),
          },
          total_ganancias: {
            increment: new Prisma.Decimal(monto),
          },
        },
      });
    }
  }
};

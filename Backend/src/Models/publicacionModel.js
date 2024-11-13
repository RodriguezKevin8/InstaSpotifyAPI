// src/Models/playlistModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPublicacion = async (data) => {
  return await prisma.publicacion.create({
    data: {
      content_url: data.content_url,
      descripcion: data.descripcion, // Cambiado a `descripcion`
      user_id: data.user_id,
      created_at: new Date(),
    },
  });
};

export const deletePublicacion = async (id) => {
  return await prisma.publicacion.delete({
    where: { id: parseInt(id) },
  });
};

export const getallpublicaciones = async () => {
  return await prisma.publicacion.findMany();
};

export const getPublicacionesByUsuarioId = async (usuarioId) => {
  return await prisma.publicacion.findMany({
    where: { user_id: usuarioId },
    include: {
      comentario: true,
      megusta: true,
    },
  });
};

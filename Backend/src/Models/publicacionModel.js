// src/Models/playlistModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPublicacion = async (data) => {
  return await prisma.publicacion.create({
    data: {
      content_url: data.content_url,
      description: data.description,
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

export const getallpublicaciones = async (userId) => {
  return await prisma.publicacion.findMany({
    include: {
      comentario: true,
      megusta: true,
      usuario: {
        select: {
          id: true,
          username: true,
          email: true,
          perfil: {
            select: {
              avatar_url: true,
            },
          },
        },
      },
    },
  });
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

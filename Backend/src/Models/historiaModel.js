// src/Models/albumModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createHistoria = async (data) => {
  return await prisma.historia.create({
    data: {
      content_url: data.content_url,
      descripcion: data.descripcion,
      created_at: data.created_at,
      user_id: data.user_id,
      cancion_id: data.cancion_id,
    },
  });
};

export const getHistoriaById = async (id) => {
  return await prisma.historia.findUnique({
    where: { user_id: parseInt(id) },
    include: {
      usuario: true,
      cancion: true,
    },
  });
};

export const deleteHistoria = async (id) => {
  return await prisma.historia.delete({
    where: { id: parseInt(id) },
  });
};

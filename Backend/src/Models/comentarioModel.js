import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createComentario = async (data) => {
  return await prisma.comentario.create({
    data,
  });
};

export const getAllComentarios = async (id) => {
  return await prisma.comentario.findMany({
    where: { publicacion_id: parseInt(id) },
  });
};

export const deleteComentario = async (id) => {
  return await prisma.comentario.delete({
    where: { id: parseInt(id) },
  });
};

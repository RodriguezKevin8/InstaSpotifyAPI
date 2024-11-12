import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMegusta = async (data) => {
  return await prisma.megusta.create({
    data,
  });
};

export const getAllMegusta = async (id) => {
  return await prisma.megusta.findMany({
    where: { publicacion_id: parseInt(id) },
  });
};

export const deleteMegusta = async (id) => {
  return await prisma.megusta.delete({
    where: { id: parseInt(id) },
  });
};

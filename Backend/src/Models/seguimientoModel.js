import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createSeguimiento = async (data) => {
  return await prisma.seguimiento.create({
    data,
  });
};

export const getSeguimiento = async (id) => {
  return await prisma.seguimiento.findMany({
    where: {
      id: id,
    },
  });
};

export const deleteSeguimiento = async (id) => {
  return await prisma.seguimiento.delete({
    where: {
      id: id,
    },
  });
};

// src/Models/generoModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllGeneros = async () => {
  return await prisma.genero.findMany();
};

export const getGeneroById = async (id) => {
  return await prisma.genero.findUnique({
    where: { id: parseInt(id) },
  });
};

export const createGenero = async (data) => {
  return await prisma.genero.create({
    data,
  });
};

export const updateGenero = async (id, data) => {
  return await prisma.genero.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteGenero = async (id) => {
  return await prisma.genero.delete({
    where: { id: parseInt(id) },
  });
};

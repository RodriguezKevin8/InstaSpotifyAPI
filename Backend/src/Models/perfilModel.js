// src/Models/perfilModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un nuevo perfil
export const createPerfil = async (perfilData) => {
  return await prisma.perfil.create({
    data: perfilData,
  });
};

// Obtener un perfil por ID de usuario
export const getPerfilByUserId = async (userId) => {
  return await prisma.perfil.findUnique({
    where: { usuario_id: userId },
  });
};

// Actualizar un perfil
export const updatePerfil = async (userId, perfilData) => {
  return await prisma.perfil.update({
    where: { usuario_id: userId },
    data: perfilData,
  });
};

// Eliminar un perfil
export const deletePerfil = async (userId) => {
  return await prisma.perfil.delete({
    where: { usuario_id: userId },
  });
};

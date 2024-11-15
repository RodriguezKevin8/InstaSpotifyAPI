// src/Models/perfilModel.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Crear un nuevo perfil
export const createPerfil = async (perfilData) => {
  const data = await prisma.perfil.create({
    data: {
      bio: perfilData.bio,
      avatar_url: perfilData.avatar_url,
      birth_date: perfilData.birth_date,
    },
  });

  const usuarioId = parseInt(perfilData.usuario_id, 10);

  await prisma.usuario.update({
    where: { id: usuarioId },
    data: { profile_id: data.id },
  });

  return data;
};

// Obtener un perfil por ID de usuario
export const getPerfilByUserId = async (userId) => {
  return await prisma.usuario.findUnique({
    where: { id: userId },
    select: {
      username: true,
      perfil: true,
      role: true,
      _count: {
        select: {
          seguimiento_seguimiento_followed_idTousuario: true, // Cantidad de personas que sigue
          seguimiento_seguimiento_follower_idTousuario: true, // Cantidad de seguidores
        },
      },
    },
  });
};

export const updatePerfil = async (userId, perfilData) => {
  const user = await prisma.usuario.findUnique({
    where: { id: userId },
    select: {
      perfil: true,
    },
  });

  return await prisma.perfil.update({
    where: { id: user.perfil.id },
    data: perfilData,
  });
};

// Eliminar un perfil
export const deletePerfil = async (userId) => {
  return await prisma.perfil.delete({
    where: { usuario_id: userId },
  });
};

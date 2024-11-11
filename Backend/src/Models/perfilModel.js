import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class perfil {
  /**
   * @param {Object} perfilData
   */
  static async createPerfil(perfilData) {
    const newPerfil = await prisma.perfil.create({
      data: {
        bio: perfilData.bio,
        avatar_url: perfilData.avatar_url,
        birth_date: perfilData.birth_date,
      },
    });
    await prisma.usuario.update({
      where: {
        id: perfilData.usuario_id,
      },
      data: {
        perfil_id: newPerfil.id,
      },
    });
    return newPerfil;
  }

  /**
   * @param {Number} id
   */
  static async getPerfil(id) {
    return await prisma.perfil.findUnique({
      where: {
        id: id,
      },
    });
  }

  /**
   * @param {Number} id
   * @param {Object} perfilData
   */
  static async updatePerfil(id, perfilData) {
    return await prisma.perfil.update({
      where: {
        id: id,
      },
      data: {
        bio: perfilData.bio,
        avatar_url: perfilData.avatar_url,
        birth_date: perfilData.birth_date,
      },
    });
  }
}

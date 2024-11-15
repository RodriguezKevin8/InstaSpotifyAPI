import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default class usuario {
  /**
   * @param {string} email
   */
  static async getUsuarioByEmail(email) {
    return await prisma.usuario.findFirst({
      where: {
        email: email,
      },
    });
  }

  /**
   * @param {string} username
   */
  static async getUsuarioByUserName(username) {
    return await prisma.usuario.findFirst({
      where: {
        username: username,
      },
    });
  }

  /**
   * @param {Object} data
   */
  static async createUsuario(data) {
    data.password = await bcrypt.hash(data.password, 10);
    return await prisma.usuario.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        nombre: data.nombre,
      },
    });
  }

  /**
   * @param {Object} data
   */
  static async login(data) {
    const user = await prisma.usuario.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      return null;
    }
    return user;
  }

  /**
   * @param {string} username
   */
  static async searchuser(username) {
    return await prisma.usuario.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },
      include: {
        perfil: true,
      },
    });
  }

  static async getPreloadedUsers() {
    return await prisma.usuario.findMany({
      take: 3,
      include: {
        perfil: true,
      },
    });
  }

  static async getUsuarioById(iduser) {
    const usuario = await prisma.usuario.findFirst({
      where: {
        id: Number(iduser),
      },
      include: {
        perfil: true,
      },
    });
    return usuario;
  }
}

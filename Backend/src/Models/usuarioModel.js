import { PrismaClient } from '@prisma/client'; 
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default class usuario {
    /**
     * @param {string} email
     */
    static async getUsuarioByEmail(email) {
        return await prisma.usuario.findFirst({
            where: {
                email: email
            },
        });
    }
    

    /**
     * @param {string} username
     */
    static async getUsuarioByUserName(username) {
        return await prisma.usuario.findFirst({
            where: {
                username: username
            }
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
                role: "Usuario",
                nombre: data.nombre
            }
        });
    }

    /**
     * @param {Object} data
     */
    static async login(data) {
        const user = await prisma.usuario.findFirst({
            where: {
                email: data.email
            }
        });
        if (!user) {
            return null;
        }
        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) {
            return null;
        }
        return user
    }
}
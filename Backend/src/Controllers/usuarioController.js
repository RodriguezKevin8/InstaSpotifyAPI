import usuario from "../Models/usuarioModel.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default class UserController {
  static async createUser(req, res) {
    const obj = { value: null, msg: "", status: false };
    try {
      // Validar que el correo no exista
      const userValidator = await usuario.getUsuarioByEmail(req.body.email);
      if (userValidator) {
        obj.msg = "Email already exists";
        return res.status(400).json(obj);
      }

      // Validar que el nombre de usuario no exista
      const usernameValidator = await usuario.getUsuarioByUserName(
        req.body.username
      );
      if (usernameValidator) {
        obj.msg = "Username already exists";
        return res.status(400).json(obj);
      }

      // Crear el usuario
      const user = await usuario.createUsuario(req.body);

      if (user.role === "Artista") {
        await prisma.ganancias.create({
          data: {
            usuario_id: user.id,
            total_ganancias: 0.0,
            ganancias_por_cancion: 0.0,
            ganancias_por_anuncio: 0.0,
            total_reproducciones: 0,
            monto_por_reproduccion: 0.01, // Valor inicial por reproducción, ajustable según tus necesidades
            fecha_actualizacion: new Date(), // Fecha de creación o última actualización
          },
        });
      }
      // Configurar el objeto de respuesta y enviarlo
      obj.value = user;
      obj.msg = "User created successfully with initial ganancias";
      obj.status = true;
      return res.status(201).json(obj);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    const obj = { value: null, msg: "", status: false };
    try {
      // Buscar usuario por email
      const user = await usuario.getUsuarioByEmail(req.body.email);
      if (!user) {
        obj.msg = "User not found";
        return res.status(404).json(obj);
      }

      // Comparar contraseñas
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        obj.msg = "Invalid password";
        return res.status(400).json(obj);
      }

      // Respuesta de éxito en el login
      obj.value = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        nombre: user.nombre,
      };
      obj.msg = "User logged in successfully";
      obj.status = true;
      return res.status(200).json(obj);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

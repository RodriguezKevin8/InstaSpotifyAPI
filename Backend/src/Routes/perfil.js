// src/Routes/perfil.js
import express from "express";
import upload from "../config/multer.js"; // Importar configuración de Cloudinary
import {
  createPerfilController,
  updatePerfilController,
} from "../Controllers/perfilController.js";

const router = express.Router();

// Ruta para crear un perfil con avatar
router.post("/", upload.single("avatar_url"), createPerfilController);

// Ruta para actualizar un perfil con avatar
router.put("/:userId", upload.single("avatar_url"), updatePerfilController);

export default router;

import express from "express";
import usuarioController from "../Controllers/usuarioController.js";

const router = express.Router();

router.post("/register", usuarioController.createUser);
router.post("/login", usuarioController.login);

export default router;

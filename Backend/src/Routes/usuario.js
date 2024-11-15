import express from "express";
import usuarioController from "../Controllers/usuarioController.js";

const router = express.Router();

router.post("/register", usuarioController.createUser);
router.post("/login", usuarioController.login);
router.get("/profile", usuarioController.preloger);

router.get("/:username", usuarioController.findusername);
router.get("/user/:id", usuarioController.getUserid);

export default router;

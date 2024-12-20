import express from "express";
import {
  getPublicaciones,
  createNewPublicacion,
  deleteExistingPublicacion,
  getPublicacionesByUsuarioController,
  getFollowedPublicaciones,
} from "../Controllers/publicacionController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", getPublicaciones);
router.post("/", upload.single("content_url"), createNewPublicacion);
router.delete("/:id", deleteExistingPublicacion);
router.get("/usuario/:usuarioId", getPublicacionesByUsuarioController);
router.get("/followed/:id", getFollowedPublicaciones);

export default router;

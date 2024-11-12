import express from "express";
import {
  getPublicaciones,
  createNewPublicacion,
  deleteExistingPublicacion,
} from "../Controllers/publicacionController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", getPublicaciones);
router.post("/", upload.single("content_url"), createNewPublicacion);
router.delete("/:id", deleteExistingPublicacion);

export default router;

import express from "express";
import {
  getGeneros,
  getGenero,
  createNewGenero,
  updateExistingGenero,
  deleteExistingGenero,
} from "../Controllers/generoController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.get("/", getGeneros);
router.get("/:id", getGenero);
router.post("/", upload.single("portada"), createNewGenero);
router.put("/:id", upload.single("portada"), updateExistingGenero);
router.delete("/:id", deleteExistingGenero);

export default router;

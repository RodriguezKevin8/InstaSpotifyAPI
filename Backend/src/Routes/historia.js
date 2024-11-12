import express from "express";
import {
  createNewHistoria,
  getHistoria,
  deleteHistorias,
} from "../Controllers/historiaController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", upload.single("content_url"), createNewHistoria);
router.get("/:id", getHistoria);
router.delete("/:id", deleteHistorias);

export default router;

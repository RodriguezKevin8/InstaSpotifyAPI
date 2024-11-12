import express from "express";
import {
  getMegustas,
  createMegustas,
  deleteMegustas,
} from "../Controllers/megustaController.js";

const router = express.Router();

router.get("/:id", getMegustas);

router.post("/", createMegustas);

router.delete("/:id", deleteMegustas);

export default router;

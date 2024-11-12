import express from "express";
import {
  getComentarios,
  createComentarios,
  deleteComentarios,
} from "../Controllers/comentarioController.js";

const router = express.Router();

router.get("/:id", getComentarios);

router.post("/", createComentarios);

router.delete("/:id", deleteComentarios);

export default router;

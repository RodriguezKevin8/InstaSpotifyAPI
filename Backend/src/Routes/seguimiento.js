import express from "express";
import {
  createSeguimientoController,
  getSeguimientoController,
  deleteSeguimientoController,
} from "../Controllers/seguimientoController.js";

const router = express.Router();

router.post("/create", createSeguimientoController);
router.get("/:id", getSeguimientoController);
router.delete("/:id", deleteSeguimientoController);

export default router;

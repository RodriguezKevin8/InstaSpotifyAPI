import express from "express";
import {
  createSeguimientoController,
  getSeguimientoController,
  deleteSeguimientoController,
  checkSeguimientoController,
} from "../Controllers/seguimientoController.js";

const router = express.Router();

router.post("/create", createSeguimientoController);
router.get("/:id", getSeguimientoController);
router.delete("/delete", deleteSeguimientoController);
router.get("/check/:followerId/:followedId", checkSeguimientoController);

export default router;

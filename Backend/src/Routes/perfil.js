import express from "express";
import perfilController from "../Controllers/perfilController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/create",upload.single("avatar"), perfilController.createPerfil);
router.patch("/update/:id", upload.single("avatar"), perfilController.updatePerfil);
router.get("/edit/:id", perfilController.getPerfil);

export default router;
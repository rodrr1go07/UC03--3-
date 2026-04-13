import { FilmeController } from "../controllers/FilmeController.js";
import { autenticarToken } from "../middlewares/authMiddleware.js";
import { autorizarPapeis } from "../middlewares/autorizarPapeis.js";
import express from "express";
const router = express.Router();


router.get("/", autenticarToken, autorizarPapeis("USER", "ADMIN"), FilmeController.listarFilmes);
router.get("/:id", autenticarToken, autorizarPapeis("USER", "ADMIN"), FilmeController.buscarPorId);

router.post("/", autenticarToken, autorizarPapeis("ADMIN"), FilmeController.criarFilme);
router.put("/:id", autenticarToken, autorizarPapeis("ADMIN"), FilmeController.atualizarFilme);
router.delete("/:id", autenticarToken, autorizarPapeis("ADMIN"), FilmeController.deletarFilme);

export default router;

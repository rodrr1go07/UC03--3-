import { UsuarioController } from "../controllers/UsuarioController.js";
import { autenticarToken, verficarAcesso } from "../middlewares/authMiddleware.js";
import { autorizarPapeis } from "../middlewares/autorizarPapeis.js";
import express from "express";
const router = express.Router();

//rotas públicas
router.post("/",UsuarioController.criarUsuario);
router.post("/login", UsuarioController.loginUsuario);
router.post("/logout", UsuarioController.logoutUsuario);

//rota privada
router.get("/", autenticarToken, autorizarPapeis("ADMIN"), UsuarioController.listarUsuarios);

router.get("/me", autenticarToken, UsuarioController.me);
router.get("/:id", autenticarToken, verficarAcesso, UsuarioController.buscarPorId);
router.put("/:id",  autenticarToken, verficarAcesso, UsuarioController.atualizarUsuario);
router.delete("/:id",  autenticarToken, verficarAcesso, UsuarioController.deletarUsuario);

export default router;


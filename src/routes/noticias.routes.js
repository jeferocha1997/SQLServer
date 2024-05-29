import express from 'express';
import * as noticiasController from '../controllers/noticias.Controller.js';
import { verificarToken } from '../middleware/authMiddleware.js'; // Importe o middleware de verificação de token
import { verificarTipoUsuario } from "../middleware/nivelUsuario.js"; // Importando o middleware de validação do token


const router = express.Router();

router.get('/', noticiasController.buscarNoticias);
router.get('/paginaInicial/:id', verificarToken, noticiasController.buscarNoticiasPorId);
router.post('/criarNoticia',verificarToken, verificarTipoUsuario(2),noticiasController.criarNoticias);

router.put('/noticias/:id', verificarToken, verificarTipoUsuario(2),noticiasController.atualizarNoticiasPorId);
router.delete('/noticias/:id', verificarToken, verificarTipoUsuario(2),noticiasController.deletarNoticiasPorId);

export default router;

import express from 'express';
import * as categoriasController from '../controllers/categorias.Controller.js';
import {verificarToken} from "../middleware/authMiddleware.js";
import { verificarTipoUsuario } from "../middleware/nivelUsuario.js"; // Importando o middleware de validação do token


const router = express.Router();

router.get('/categorias', verificarToken,categoriasController.buscarCategoria);
router.post('/criarCategoria', verificarToken,verificarTipoUsuario(2),categoriasController.criarCategoria);
router.get('/categorias/:usuario_id', verificarToken,verificarTipoUsuario(2),categoriasController.buscarCategoriaPorId);

router.put('/categorias/:id', verificarToken,verificarTipoUsuario(2),categoriasController.atualizarCategoriaPorId);
router.delete('/categorias/:id', verificarToken,verificarTipoUsuario(2),categoriasController.deletarCategoriaPorId);

export default router;

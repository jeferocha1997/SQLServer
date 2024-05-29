import express from 'express';
import * as usuarioController from '../controllers/usuarios.Controller.js';
import { verificarToken } from "../middleware/authMiddleware.js"; //  middleware de validação do token
import { verificarTipoUsuario } from "../middleware/nivelUsuario.js"; //  nivel_usuario = 2

const router = express.Router();

router.post('/login', usuarioController.buscarUsuario);
router.post('/criarConta', usuarioController.criarUsuario);

router.get('/usuarios/:id', verificarToken, usuarioController.buscarUsuarioPorId);

router.put('/usuarios/:id', verificarToken, verificarTipoUsuario(2),usuarioController.atualizarUsuarioPorId); // Rota para atualizar usuário por ID, protegida pelo token JWT
router.delete('/usuarios/:id', verificarToken, verificarTipoUsuario(2),usuarioController.deletarUsuarioPorId); // Rota para deletar usuário por ID, protegida pelo token JWT

export default router;

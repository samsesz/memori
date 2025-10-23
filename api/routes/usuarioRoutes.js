import express from 'express';
const usuarioRoutes = express.Router();
import usuarioController from '../controllers/usuarioController.js';  
import Auth from "../middleware/Auth.js";

usuarioRoutes.get('/', Auth, usuarioController.getAllUsuarios);
usuarioRoutes.post('/', usuarioController.createUsuario);
usuarioRoutes.delete('/:id', Auth, usuarioController.deleteUsuario);
usuarioRoutes.put('/:id', Auth, usuarioController.updateUsuario);
usuarioRoutes.get('/:id', Auth, usuarioController.getOneUsuario);
usuarioRoutes.post('/auth', usuarioController.LoginUsuario);

export default usuarioRoutes;


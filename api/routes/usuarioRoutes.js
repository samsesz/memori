import express from 'express';
const usuarioRoutes = express.Router();
import usuarioController from '../controllers/usuarioController.js';  
import Auth from "../middleware/Auth.js";

usuarioRoutes.get('/', Auth.authorization, usuarioController.getAllUsuarios);
usuarioRoutes.post('/', usuarioController.createUsuario);
usuarioRoutes.delete('/:id', Auth.authorization, usuarioController.deleteUsuario);
usuarioRoutes.put('/:id', Auth.authorization, usuarioController.updateUsuario);
usuarioRoutes.get('/:id', Auth.authorization, usuarioController.getOneUsuario);
usuarioRoutes.post('/auth', usuarioController.LoginUsuario);

export default usuarioRoutes;


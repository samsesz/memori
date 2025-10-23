import express from 'express';
const rotaRoutes = express.Router();
import rotaController from '../controllers/rotaController.js';
import {uploadRota} from "../middleware/multerConfig.js";

rotaRoutes.get('/', rotaController.getAllRotas);
rotaRoutes.delete('/:id', rotaController.deleteRota);
rotaRoutes.get('/:id', rotaController.getOneRota);
rotaRoutes.post("/", uploadRota.single('capaRota'), rotaController.createRota);
rotaRoutes.put("/:id", uploadRota.single('capaRota'), rotaController.updateRota);


export default rotaRoutes;
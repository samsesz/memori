import express from "express";
const modelagemRoutes = express.Router();
import modelagemController from "../controllers/modelagemController.js";
import {uploadQRCode} from "../middleware/multerConfig.js";

// import Auth from "../middleware/Auth.js";

modelagemRoutes.get("/", modelagemController.getAllModelagens);
modelagemRoutes.delete("/:id", modelagemController.deleteModelagem);
modelagemRoutes.get("/:id", modelagemController.getOneModelagem);
modelagemRoutes.post("/", uploadQRCode.single('QRCodeImagem'), modelagemController.createModelagem);
modelagemRoutes.put("/:id", uploadQRCode.single('QRCodeImagem'), modelagemController.updateModelagem);

export default modelagemRoutes;
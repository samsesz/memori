import express from "express";
const checkpointRoutes = express.Router();
import checkpointController from "../controllers/checkpointController.js";
import {uploadCheckpoint} from "../middleware/multerConfig.js";

// import Auth from "../middleware/Auth.js";

// --- Rotas GET e DELETE (não mudam) ---
checkpointRoutes.get("/", checkpointController.getAllCheckpoints);
checkpointRoutes.delete("/:id", checkpointController.deleteCheckpoint);
checkpointRoutes.get("/:id", checkpointController.getOneCheckpoint);

// --- Rotas POST e PUT (CORRIGIDAS) ---

// 1. Rota POST: Adicionado o middleware 'uploadCheckpoint'
//    O nome 'capaCheckpoint' DEVE ser o mesmo usado no FormData do frontend
checkpointRoutes.post(
    "/", 
    uploadCheckpoint.single('capaCheckpoint'), 
    checkpointController.createCheckpoint
);

// 2. Rota PUT: Também precisa do middleware para atualizações de imagem
checkpointRoutes.put(
    "/:id", 
    uploadCheckpoint.single('capaCheckpoint'), 
    checkpointController.updateCheckpoint
);

export default checkpointRoutes;
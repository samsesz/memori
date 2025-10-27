import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração base do Express
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ---- SERVIR FRONTEND E ARQUIVOS ESTÁTICOS ---- //
app.use(express.static(path.join(__dirname, "front"))); // pasta do front
app.use(express.static(path.join(__dirname, "public"))); // acesso a qrcodes e modelos
app.use("/modelos", express.static(path.join(__dirname, "public/modelos/teste"))); // modelos 3D
app.use("/qrcodes", express.static(path.join(__dirname, "public/qrcodes"))); // qrcodes

// ---- IMPORTAR MODELOS (para garantir criação no MongoDB) ---- //
import Checkpoint from "./models/Checkpoints.js";
import Modelagend from "./models/Modelagens.js";
import Quizzes from "./models/Quizzes.js";
import Rotas from "./models/Rotas.js";
import Usuarios from "./models/Usuarios.js";

// ---- ROTAS DA API ---- //
import checkpointRoutes from "./routes/checkpointRoutes.js";
import modelagemRoutes from "./routes/modelagemRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import rotaRoutes from "./routes/rotaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

app.use("/api/checkpoint", checkpointRoutes);
app.use("/api/modelagem", modelagemRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/rota", rotaRoutes);
app.use("/api/usuario", usuarioRoutes);

// ---- CONEXÃO COM MONGO ---- //
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/api-memori";
const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(" Conectado ao MongoDB com sucesso!");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(` Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" Erro ao conectar ao MongoDB:", error);
  });

// Rota padrão para testar
app.get("/", (req, res) => {
  res.send("Servidor Memori rodando ");
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

// Importando para ser criado no banco 
import Checkpoint from "./models/Checkpoints.js"
import Modelagend from "./models/Modelagens.js";
import Quizzes from "./models/Quizzes.js";
import Rotas from "./models/Rotas.js";
import Usuarios from "./models/Usuarios.js";

// importando as rotas
import checkpointRoutes from "./routes/checkpointRoutes.js";
import modelagemRoutes from "./routes/modelagemRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import rotaRoutes from "./routes/rotaRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

app.use(cors({
  origin: 'http://localhost:3000', // Substitua pela origem do seu front-end
}))

// Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

// Adicione o prefixo /api/ em todas as rotas
app.use('/api/checkpoint', checkpointRoutes);
app.use('/api/modelagem', modelagemRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/rota', rotaRoutes);
app.use('/api/usuario', usuarioRoutes);

// Iniciando a conexão com o banco de dados do MongoDB
const port = 4000;

mongoose.connect("mongodb://127.0.0.1:27017/api-memori")
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso!');
    app.listen(port, () => {
      console.log(`API rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

// server.js (para servir o front apenas)
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, "front")));
app.use(express.static(path.join(__dirname, "public"))); // para acessar modelos e qrcodes
app.use('/modelos', express.static(path.join(__dirname, 'public/modelos/teste')));


const PORT = 5500;
app.listen(PORT, "0.0.0.0", () => console.log(`Front rodando em http://localhost:${PORT}`));


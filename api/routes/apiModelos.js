// server.js (ou routes/modelos.js)
const express = require("express");
const path = require("path");
const app = express();

// Serve arquivos estáticos (se for servir .gltf/.glb do servidor)

app.use("/modelagem", express.static(path.join(__dirname, "../public/modelagem")));


// Exemplo de "banco" simples em memória
const modelos = {
  "1": {
    id: "1",
    name: "Casa Suburbana",
    url: "/modelagem/suburban_house/scene.gltf",
    scale: "1 1 1",
    position: "0 0 0"
  }
};


app.get("/api/modelos/:id", (req, res) => {
  const m = modelos[req.params.id];
  if (!m) return res.status(404).json({ error: "Modelo não encontrado" });
  // Se frontend estiver em outro domínio, habilite CORS (apenas para teste)
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(m);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API rodando na porta ${port}`));

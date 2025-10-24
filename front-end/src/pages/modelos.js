// pages/api/modelos/[id].js
export default function handler(req, res) {
const modelos = {
  "1": {
    id: "1",
    name: "Casa Suburbana",
    url: "/modelagem/suburban_house/scene.gltf",
    scale: "1 1 1",
    position: "0 0 0"
  }
};

  const { id } = req.query;
  const m = modelos[id];
  if (!m) return res.status(404).json({ error: "Modelo não encontrado" });
  return res.status(200).json(m);
}

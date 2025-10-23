import mongoose from "mongoose";

const rotasSchema = new mongoose.Schema({
    tituloRota: String,
    cidadeLocalizada: String,
    longitudeRota: String,
    latitudeRota: String,
    imagemCapa: String,
    descricaoRota: String,
});
const Rotas = mongoose.model("Rotas", rotasSchema);
export default Rotas;
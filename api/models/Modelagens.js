import mongoose from "mongoose";

const modelagensSchema = new mongoose.Schema({
    nomeModelagem: String,
    nomeCidade: String,
    arquivoModelagem: String,
    arquivoQrCode: String,
    nomeCheckpoint:[{
        type: String,
        ref: 'Checkpoint'
    }]
});
const Modelagens = mongoose.model("Modelagens", modelagensSchema);
export default Modelagens;
import mongoose from "mongoose";

const checkpointSchema = new mongoose.Schema({
    nomeCheckpoint: String,
    latitudeCheckpoint: Number,
    longitudeCheckpoint: Number,
    tituloRota: String,
    descricaoCheckpoint: String,
    imagemCheckpoint: String,
});
const Checkpoint = mongoose.model("Checkpoint", checkpointSchema);
export default Checkpoint;
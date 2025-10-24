import Checkpoint from "../models/Checkpoints.js";

class checkpointService {
  async getAll() {
    try {
      const checkpoints = await Checkpoint.find();
      return checkpoints;
    } catch (error) {
      console.log(error);
    }
  }
  
async Create(
  nomeCheckpoint,
  latitudeCheckpoint,
  longitudeCheckpoint,
  tituloRota,
  descricaoCheckpoint,
  imagemCheckpoint,
) {
  try {
    const newCheckpoint = new Checkpoint({
      nomeCheckpoint,
      latitudeCheckpoint,
      longitudeCheckpoint,
      tituloRota,
      descricaoCheckpoint,
      imagemCheckpoint,
    });
    await newCheckpoint.save();
  } catch (error) {
    console.log(error);
  }
}

  async Delete(id) {
    try {
      await Checkpoint.findByIdAndDelete(id);
      console.log(`Checkpoint com id ${id} deletado com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(
    id,
    nomeCheckpoint,
    latitudeCheckpoint,
    longitudeCheckpoint,
    tituloRota,
    descricaoCheckpoint,
    imagemCheckpoint
  ) {
    try {
      const checkpoint = await Checkpoint.findByIdAndUpdate(
        id,
        {
          nomeCheckpoint,
          latitudeCheckpoint,
          longitudeCheckpoint,
          tituloRota,
          descricaoCheckpoint,
          imagemCheckpoint,
        },
        { new: true }
      );
      console.log(`Checkpoint com id ${id} atualizado com sucesso!`);
      return checkpoint;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const checkpoint = await Checkpoint.findOne({ _id: id });
      return checkpoint;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new checkpointService();

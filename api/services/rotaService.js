import Rota from "../models/Rotas.js";

class RotaService {
  async getAll() {
    try {
        const rotas = await Rota.find();
        return rotas;
    } catch (error) {
        console.log(error);
    }
    }

    async Create(tituloRota,cidadeLocalizada,longitudeRota,latituteRota,imagemCapa,descricaoRota) { 
        try {
            const newRota = new Rota({
                tituloRota,
                cidadeLocalizada,
                longitudeRota,
                latituteRota,
                imagemCapa,
                descricaoRota,
            });
            await newRota.save();
        } catch (error) {
            console.log(error);
        }   
    }

    async Delete(id) {
        try {
            await Rota.findByIdAndDelete(id);   
            console.log(`Rota com id ${id} deletada com sucesso!`);
        } catch (error) {
            console.log(error);
        }
    }

    async Update(id, tituloRota, cidadeLocalizada, longitudeRota, latituteRota, imagemCapa, descricaoRota) {
        try {
            const rota = await Rota.findByIdAndUpdate(id, {
                tituloRota,
                cidadeLocalizada,
                longitudeRota,
                latituteRota,
                imagemCapa,
                descricaoRota
            }, 
            { new: true }
        );
            console.log(`Rota com id ${id} atualizada com sucesso!`);
            return rota;
        } catch (error) {
            console.log(error);
        }
    }

    async getOne(id) {
        try {
            const rota = await Rota.findOne({ _id: id });
            return rota;
        } catch (error) {
            console.log(error);
        }
    }
}

export default new RotaService();

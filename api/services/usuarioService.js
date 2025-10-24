import Usuario from '../models/Usuarios.js';

class usuarioService {
    async getAll() {
        try {
            const usuarios = await Usuario.find();
            return usuarios;
        } catch (error) {
            console.log(error);
        }
    }

    async Create(nome, nomeUsuario, emailUsuario, senhaUsuario, permissao) { 
        try {
            const newUsuario = new Usuario({
                nome,
                nomeUsuario,
                emailUsuario,  
                senhaUsuario,
                permissao,
            });
            await newUsuario.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    async Delete(id) {
        try {
            await Usuario.findByIdAndDelete(id);   
            console.log(`Usuario com id ${id} deletado com sucesso!`);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async Update(id, nome, nomeUsuario, emailUsuario, senhaUsuario, permissao) {
        try {
            const usuario = await Usuario.findByIdAndUpdate(id, {
                nome,
                nomeUsuario,
                emailUsuario,  
                senhaUsuario,
                permissao,
            },
            { new: true }
        );
            console.log(`Usuario com id ${id} atualizado com sucesso!`);
            return usuario;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getOne(id) {
        try {
            const usuario = await Usuario.findOne({ _id: id });
            return usuario;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getByEmail(emailUsuario) {
        try {
            const usuario = await Usuario.findOne({ emailUsuario: emailUsuario });
            return usuario;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new usuarioService();

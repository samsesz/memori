import axios from 'axios';

export const axiosConfig = {
    headers: {
        authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem("token") : ""   
        }`,
    },
};

export const login = async (emailUsuario, senhaUsuario) => {
    try {
        const res = await axios.post("http://localhost:4000/api/usuario/auth", {
            emailUsuario,
            senhaUsuario,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
        alert("Login realizado com sucesso!");
        axiosConfig.headers.authorization = `Bearer ${token}`;
        return { success: true };
    } catch (error) {
        if (error.response) {
            // O servidor respondeu com um status de erro (4xx ou 5xx)
            console.error("Erro de Resposta do Servidor:", error.response.status, error.response.data);
            return { success: false, message: error.response.data.message || "Erro de credenciais ou servidor." };
        } else if (error.request) {
            // A requisição foi feita, mas não houve resposta (ex: servidor desligado, erro de rede/CORS)
            console.error("Erro de Rede ou Servidor Desligado:", error.request);
            return { success: false, message: "Erro de rede. Verifique se o servidor está online em http://localhost:4000." };
        } else {
            // Erro ao configurar a requisição
            console.error("Erro de Configuração do Axios:", error.message);
        return { success: false, message: error.message };
        }
    }
};

export const logout = (router) => {
    localStorage.removeItem("token");
    axiosConfig.headers.authorization = "";
    router.push("/login");
}
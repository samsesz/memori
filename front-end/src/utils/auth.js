import axios from 'axios';
import { headers } from 'next/headers';

export const axiosConfig = {
    headers: {
        authorization: `Bearer ${typeof window === 'undefined' ? localStorage.getItem("token") : ""   
        }`,
    },
};

export const login = async (emailUsuario, senhaUsuario) => {
    try {
        const res = await axios.post("http://localhost:4000/auth", {
            emailUsuario,
            senhaUsuario,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
        console.log(token) // pra testar
        alert("Login realizado com sucesso!");
        axiosConfig.headers.authorization = `Bearer ${token}`;
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const logout = (router) => {
    localStorage.removeItem("token");
    axiosConfig.headers.authorization = "";
    router.push("/login");
}
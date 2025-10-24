import style from "@/components/LoginForm/LoginForm.module.css";
import { useState } from "react";
import { login } from "@/utils/auth";
import { useRouter } from "next/router";

const LoginContent = () => {
    const router = useRouter();
    const [emailUsuario, setEmailUsuario] = useState("");
    const [senhaUsuario, setSenhaUsuario] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(emailUsuario, senhaUsuario);
        if(result.success) {
            router.push("/usuarios");
        } else {
            alert("Falha ao fazer login. Tente novamente.");
        }
    };

    return (
        <div className={style.loginContainer}>  
            <img src="/Logo_texto.png" alt="Company Logo" className={style.formLogo}/>
            <form className={style.formLogin} onSubmit={handleSubmit}>
                <div className={style.inputWrapper}>
                    <input
                        type="text"
                        placeholder="Nome de Usuário"
                        className={style.inputField}
                        value={emailUsuario}
                        onChange={(e) => setEmailUsuario(e.target.value)}
                    />
                </div>
                <div className={style.inputWrapper}>
                    <input
                        type="password"
                        placeholder="Senha"
                        className={style.inputField}
                        value={senhaUsuario}
                        onChange={(e) => setSenhaUsuario(e.target.value)}
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
            <p className={style.signUp}>
                Ainda não tem uma conta? <a href="http://localhost:3000/register">Cadastre-se!</a>
            </p>
        </div>
    );
};

export default LoginContent;


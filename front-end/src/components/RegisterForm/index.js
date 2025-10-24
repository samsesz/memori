import { useState } from "react";
import style from "@/components/RegisterForm/RegisterForm.module.css";

const RegisterForm = () => {
    const [nome, setNome] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [emailUsuario, setEmailUsuario] = useState("");
    const [senhaUsuario, setSenhaUsuario] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        try {
            const res = await fetch("http://localhost:4000/api/usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    nomeUsuario,
                    emailUsuario,
                    senhaUsuario,
                    permissao: "user",
                }),
            });

            if (res.status === 201) {
                setMessage({ type: "success", text: "Cadastro realizado com sucesso." });
                setNome("");
                setNomeUsuario("");
                setEmailUsuario("");
                setSenhaUsuario("");
            } else {
                const data = await res.json().catch(() => ({}));
                setMessage({ type: "error", text: data.error || `Erro: status ${res.status}` });
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Falha ao conectar com a API." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={style.loginContainer}>
                <img src="/Logo_texto.png" alt="Company Logo" className={style.formLogo} />

                <p className={style.formTitle}></p>
                <form onSubmit={handleSubmit} className={style.formRegister}>

                    <div className={style.inputWrapper}>
                        <input
                            name="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                            placeholder="Nome completo"
                            className={style.inputField}
                            required
                        />
                    </div>

                    <div className={style.inputWrapper}>
                        <input
                            name="nomeUsuario"
                            value={nomeUsuario}
                            onChange={(e) => setNomeUsuario(e.target.value)}
                            type="text"
                            placeholder="Nome de Usuário"
                            className={style.inputField}
                            required
                        />
                    </div>

                    <div className={style.inputWrapper}>
                        <input
                            name="emailUsuario"
                            value={emailUsuario}
                            onChange={(e) => setEmailUsuario(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            className={style.inputField}
                            required
                        />
                    </div>

                    <div className={style.inputWrapper}>
                        <input
                            name="senhaUsuario"
                            value={senhaUsuario}
                            onChange={(e) => setSenhaUsuario(e.target.value)}
                            type="password"
                            placeholder="Senha"
                            className={style.inputField}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>

                {message && (
                    <p className={message.type === "error" ? style.errorMsg : style.successMsg}>
                        {message.text}
                    </p>
                )}

                <p className={style.signUp}>
                    Já possui uma conta? <a href="/login"> Faça o seu login! </a>
                </p>
            </div>
        </>
    );
};

export default RegisterForm;
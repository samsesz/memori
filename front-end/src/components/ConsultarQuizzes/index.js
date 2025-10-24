import { useState, useEffect } from 'react';
import style from "@/components/ConsultarQuizzes/ConsultarQuizzes.module.css";


const ConsultarQuizzes = () => {

    const checkpointsExistentes = [
    {
        nome: "Guaracuí"
    },
    {
        nome: "Rio Ribeira de Iguape"
    },
    {
        nome: "Museu do chá"
    }
];

    const [checkpointSelecionado, setCheckpointSelecionado] = useState('');

    const handleClick = () => {
        alert("Função de back-end não implementada (MVP).");
    }

    const [alternativaCorreta, setAlternativaCorreta] = useState('');
    
    return(
        <>
        
    <div className={style.wrapperQuizzes}> 

{/* Formulário de Cadastro de Quizzes */}

        <div className={style.formQuizzes}>
            
                <p className={style.formTitle}>Cadastro de Quizzes</p> 

            <form action="#" className={style.cadastroQuizzes}>
                   {/* --- MODIFICADO: Wrapper da Pergunta + Dropdown --- */}
                        {/* Adicionamos uma classe extra para o flex layout */}
                        <div className={`${style.inputWrapper} ${style.perguntaWrapper}`}>
                            {/* Input da Pergunta (agora ocupa menos espaço) */}
                            <input
                                type="text"
                                placeholder="Pergunta"
                                className={`${style.inputField} ${style.perguntaInput}`} // Classe extra para ajustar largura
                            />
                            {/* Dropdown da Resposta Correta */}
                            <select
                                className={`${style.inputField} ${style.respostaSelect}`} // Reutiliza estilo, classe extra para largura
                                value={alternativaCorreta}
                                onChange={(e) => setAlternativaCorreta(e.target.value)}
                                required
                            >
                                <option value="" disabled>Correta?</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </div>
                        {/* --- Fim da Modificação --- */}

                        <div className={style.inputWrapper}>
                            <input type="text" placeholder="Alternativa A" className={style.inputField} />
                        </div>
                        <div className={style.inputWrapper}>
                            <input type="text" placeholder="Alternativa B" className={style.inputField} />
                        </div>
                        <div className={style.inputWrapper}>
                            <input type="text" placeholder="Alternativa C" className={style.inputField} />
                        </div>
                        <div className={style.inputWrapper}>
                            <input type="text" placeholder="Alternativa D" className={style.inputField} />
                        </div>

                       <div className={style.inputWrapper}>
                            <select 
                                className={style.inputField} 
                                value={checkpointSelecionado}
                                onChange={(e) => setCheckpointSelecionado(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecione um checkpoint</option>
                                
                                {checkpointsExistentes.map((rota) => (
                                    <option key={rota.nome} value={rota.nome}>
                                        {rota.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    

                        {/* CORRIGIDO: Adicionada classe ao botão */}
                        <button type="submit" className={style.submitButton}>Cadastrar</button>
                    </form>         
        </div>

        <div className={style.tableContainer}>
         <table className={style.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Pergunta</th>
                        <th>Alternativa A</th>
                        <th>Alternativa B</th>
                        <th>Alternativa C</th>
                        <th>Alternativa D</th>
                        <th>Alternativa E</th>
                        <th>Correta</th>
                        <th>Ações</th>
                        
                    </tr>
                </thead>
                <tbody>
                
                    <tr>
                        <td data-label="Id">01</td>
                        <td data-label="Pergunta">Quantos anos tem a independência do Brasil? </td>
                        <td data-label="AlternativaA">100 anos</td>
                        <td data-label="AlternativaB">117 anos</td>   
                        <td data-label="AlternativaC">120 anos</td>            
                        <td data-label="AlternativaD">130 anos </td>            
                        <td data-label="AlternativaE">102 anos </td>            
                        <td data-label="Correta">B</td>                                             
                        <td data-label="Ações"> 

                            <button onClick={handleClick} className={`${style.actionButton} ${style.editarButton}`}>
                                Editar
                            </button>
                            <button onClick={handleClick} className={`${style.actionButton} ${style.excluirButton}`}>
                                Excluir
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>  
        </div>
    </div> 
    </>
    )

    
}

export default ConsultarQuizzes;
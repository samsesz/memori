import { useState, useEffect } from 'react';
import style from "@/components/ConsultarUsuarios/ConsultarUsuarios.module.css";


const ConsultarUsuarios = () => {

    const handleClick = () => {
        alert("Função de back-end não implementada (MVP).");
    }

  // --- Estado do Switch do FORMULÁRIO ---
    const [isAdmin, setIsAdmin] = useState(false);
    const handleFormToggle = () => {
        setIsAdmin(prevIsAdmin => !prevIsAdmin);
    };
    
    // --- Estado do Switch da TABELA  ---
    const [isTableAdmin, setIsTableAdmin] = useState(false); 

    // --- Lógica de Confirmação (para a TABELA) ---
    const handleTableToggle = () => {
        const novoEstado = !isTableAdmin; // Calcula o novo estado
        const acao = novoEstado ? 'Administrador' : 'Usuário Padrão';
        
        const confirmou = confirm(`Deseja alterar a permissão deste usuário para ${acao}?`);

        if (confirmou) {
            setIsTableAdmin(novoEstado); // Atualiza o estado da tabela
            alert("Alterações salvas!");
        } else {
            alert("Alteração cancelada.");
        }
    };
    
    return(
        <>
        
    <div className={style.wrapperUsuarios}> 

{/* Formulário de Cadastro de Usuarios */}

        <div className={style.formUsuarios}>
            
                <p className={style.formTitle}>Cadastro de Usuários</p> 

            <form action="#" className={style.cadastroUsuarios}>
                   <div className={style.inputWrapper}>
            <input type = "name" placeholder="Nome completo" className={style.inputField}/> 
         <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="FF6B6B"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
        </div>

        <div className={style.inputWrapper}>
            <input type = "username" placeholder="Nome de Usuário" className={style.inputField}/> 
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="FF6B6B"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v58q0 59-40.5 100.5T740-280q-35 0-66-15t-52-43q-29 29-65.5 43.5T480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480v58q0 26 17 44t43 18q26 0 43-18t17-44v-58q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93h160q17 0 28.5 11.5T680-120q0 17-11.5 28.5T640-80H480Zm0-280q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>
        </div>
        

          <div className={style.inputWrapper}>
            <input type = "email" placeholder="E-mail" className={style.inputField}/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm640-480L501-453q-5 3-10.5 4.5T480-447q-5 0-10.5-1.5T459-453L160-640v400h640v-400ZM480-520l320-200H160l320 200ZM160-640v10-59 1-32 32-.5 58.5-10 400-400Z"/></svg>
        </div>

        
          <div className={style.inputWrapper}>
            <input type = "password" placeholder="Senha" className={style.inputField}/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="FF6B6B"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
        </div>

       <div className={style.switchWrapper}>
            <span className={style.switchLabel}>Permissão:</span>
            <label className={style.switch}>
                <input 
                    type="checkbox" 
                    checked={isAdmin}
                    onChange={handleFormToggle} // Usa o handler do formulário
                />
                <span className={style.slider}></span>
            </label>
            <span className={`${style.switchStatus} ${isAdmin ? style.adminStatus : ''}`}>
                {isAdmin ? 'Administrador' : 'Usuário Padrão'}
            </span>
        </div>

                        
        <button>Cadastrar</button>

            </form>
        </div>

        <div className={style.tableContainer}>
         <table className={style.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Usuário</th>
                        <th>E-mail</th>
                        <th>Permissão</th>
                        <th>Ações</th>
                        
                    </tr>
                </thead>
                <tbody>
                
                    <tr>
                        <td data-label="Id">01</td>
                        <td data-label="Nome">Larissa Toyohashi</td>
                        <td data-label="Usuario">ltoyohashi</td>
                        <td data-label="Email">ltoyohashi@gmail.com</td>            
                        <td data-label="Permissao">
                                    <label className={style.switch}>
                                        <input 
                                            type="checkbox" 
                                            checked={isTableAdmin} 
                                            onChange={handleTableToggle}/>
                                        <span className={style.slider}></span>
                                    </label>
                        </td>
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

export default ConsultarUsuarios;
import { useState, useEffect } from 'react';
import style from "@/components/ConsultarModelagens/ConsultarModelagens.module.css";
import dynamic from 'next/dynamic';


    const ModalViewer3D = dynamic(
    () => import('@/components/ModalViewer3D'),
    { ssr: false } // Garante que ele não rode no servidor
    );

const ConsultarModelagens = () => {

     const API_CIDADES_SP_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios';
    
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
        // Modelagem 3D - Visualização
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAbrirModal = () => {
        // (Aqui você definiria qual modelo abrir)
        // setModeloSelecionadoUrl(urlDoModeloDaLinha); 
        setIsModalOpen(true);
    };

    const handleFecharModal = () => {
        setIsModalOpen(false);
    };

    const [cidades, setCidades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = () => {
        alert("Função de back-end não implementada (MVP).");
    };


    useEffect(() => {
        setIsLoading(true);
        fetch(API_CIDADES_SP_URL)
            .then(response => response.json())
            .then(data => {
               
                const cidadesOrdenadas = data.sort((a, b) => a.nome.localeCompare(b.nome));
                setCidades(cidadesOrdenadas);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar cidades de SP:', error);
                setIsLoading(false);
            });
    }, []); 

    const [checkpointSelecionado, setCheckpointSelecionado] = useState('');

    
    const [modelFileName, setModelFileName] = useState('');
    const [qrCodeFileName, setQrCodeFileName] = useState('');

    const handleModelFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setModelFileName(e.target.files[0].name);
        } else {
            setModelFileName('');
        }
    };
    
    const handleQrCodeFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setQrCodeFileName(e.target.files[0].name);
        } else {
            setQrCodeFileName('');
        }
    };

    return(
        <>
        
    <div className={style.wrapperModelagens}> 

{/* Formulário de Cadastro de Modelagens */}

        <div className={style.formModelagens}>
            
                <p className={style.formTitle}>Cadastro de Modelagens</p> 

            <form action="#" className={style.cadastroModelagens}>
                 <div className={style.inputWrapper}>
                    <input type = "text" placeholder="Nome da modelagem" className={style.inputField}/>
                </div>

                <div className={style.inputWrapper}>
                            <input
                                type="text"
                                list="cidades-sp-lista" 
                                placeholder={isLoading ? "Carregando cidades..." : "Cidade (SP)"}
                                disabled={isLoading}
                                className={style.inputField} 
                            />
                            <datalist id="cidades-sp-lista">
                                {cidades.map((cidade) => (
                                    <option key={cidade.id} value={cidade.nome} />
                                ))}
                            </datalist>
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
                    
                        
                        <div className={style.inputWrapper}>
                            <label htmlFor="upload-3d" className={style.uploadButton}>
                                {modelFileName ? `Modelo: ${modelFileName}` : 'Upload de Modelagem 3D'}
                            </label>
                            <input 
                                id="upload-3d"
                                type="file"  
                                accept=".glb, .gltf, .obj" 
                                className={style.hiddenInput}
                                onChange={handleModelFileChange}
                            />
                        </div>

                         <div className={style.inputWrapper}>
                            <label htmlFor="upload-qr" className={style.uploadButton}>
                                {qrCodeFileName ? `QR Code: ${qrCodeFileName}` : 'Upload de QR Code'}
                            </label>
                            <input 
                                id="upload-qr"
                                type="file"  
                                accept="image/*"
                                className={style.hiddenInput}
                                onChange={handleQrCodeFileChange}
                            />
                        </div>
                        
                        <button>Cadastrar</button>

            </form>
        </div>

        <div className={style.tableContainer}>
         <table className={style.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Modelagem</th>
                        <th>Título</th>
                        <th>Cidade</th>
                        <th>Checkpoint</th>
                        <th>QRCode</th> 
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                
                    <tr>
                        <td data-label="Id">01</td>
                       <td data-label="Modelagem">
                                    <button 
                                        onClick={handleAbrirModal} 
                                        className={`${style.actionButton} ${style.visualizarButton}`}
                                    >
                                        Visualizar
                                    </button>
                        </td>
                        <td data-label="Título">Rota das Flores</td>
                        <td data-label="Cidade">Holambra</td>
                        <td data-label="Checkpoint">Rio Ribeira de Iguape</td>
                        <td>
                            <img 
                                src="/logo_quadrado.png" 
                                className={style.tableImage} 
                            />
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

    {isModalOpen && (
                <ModalViewer3D 
                    onClose={handleFecharModal} 
                    urlModelo="/modelagem/suburban_house/scene.gltf"
                />
            )}

    </>
    )

    
}

export default ConsultarModelagens;
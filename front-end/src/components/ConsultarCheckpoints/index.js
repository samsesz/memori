import { useState, useEffect } from 'react';
import style from "@/components/ConsultarCheckpoints/ConsultarCheckpoints.module.css";

// Importar as funções da sua camada de API
// Ajuste o caminho se '@/' não for sua raiz 'src'
import { getCheckpoints, createCheckpoint, deleteCheckpoint, getRotas } from '@/services/api';

const ConsultarCheckpoints = () => {
    
    // --- Estados do Formulário ---
    const [nomeCheckpoint, setNomeCheckpoint] = useState('');
    const [descricaoCheckpoint, setDescricaoCheckpoint] = useState('');
    const [rotaSelecionada, setRotaSelecionada] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [capaCheckpointFile, setCapaCheckpointFile] = useState(null);
    const [capaCheckpointFileName, setCapaCheckpointFileName] = useState('');

    // --- Estados da Tabela ---
    const [checkpoints, setCheckpoints] = useState([]);
    const [rotas, setRotas] = useState([]); 

    // --- Efeito para Buscar Dados (GET) ---
    useEffect(() => {
        fetchCheckpoints();
        fetchRotas();
    }, []);

    const fetchCheckpoints = async () => {
        try {
            const response = await getCheckpoints();
            // axios aninha a resposta em 'response.data'
            setCheckpoints(response.data.checkpoints || []);
        } catch (error) {
            console.error("Erro no fetchCheckpoints:", error);
            alert("Não foi possível carregar os checkpoints.");
        }
    };

    const fetchRotas = async () => {
        try {
            const response = await getRotas();
            // Assumindo que a API retorna { rotas: [...] }
            setRotas(response.data.rotas || []); 
        } catch (error) {
            console.error("Erro no fetchRotas:", error);
        }
    };

    // --- Funções de Manipulação de Eventos ---
    const handlecapaCheckpointFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCapaCheckpointFile(e.target.files[0]);
            setCapaCheckpointFileName(e.target.files[0].name);
        } else {
            setCapaCheckpointFile(null);
            setCapaCheckpointFileName('');
        }
    };

    const handleEditClick = (checkpoint) => {
        alert("Função de 'Editar' não implementada (MVP).");
        // Para implementar:
        // 1. Preencher o formulário com os dados do 'checkpoint'
        // 2. Mudar o botão para "Atualizar"
        // 3. No submit, chamar api.updateCheckpoint(checkpoint._id, formData)
    };

    const clearForm = () => {
        setNomeCheckpoint('');
        setDescricaoCheckpoint('');
        setRotaSelecionada('');
        setLatitude('');
        setLongitude('');
        setCapaCheckpointFile(null);
        setCapaCheckpointFileName('');
        const fileInput = document.getElementById('upload-capaCheckpoint');
        if (fileInput) fileInput.value = null;
    };

    // --- Função de Criar (POST) ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Criar o FormData
        const formData = new FormData();
        
        // 2. Adicionar os campos de texto
        formData.append('nomeCheckpoint', nomeCheckpoint);
        formData.append('descricaoCheckpoint', descricaoCheckpoint);
        formData.append('tituloRota', rotaSelecionada);
        formData.append('latitudeCheckpoint', latitude);
        formData.append('longitudeCheckpoint', longitude);

        // 3. Adicionar o arquivo
        if (capaCheckpointFile) {
            // O nome 'capaCheckpoint' DEVE ser igual ao usado no uploadCheckpoint.single()
            formData.append('capaCheckpoint', capaCheckpointFile);
        } else {
             alert("Por favor, selecione uma imagem de capa.");
             return;
        }

        try {
            // 4. Chamar a API
            const response = await createCheckpoint(formData); 
            if (response.status === 201) {
                alert("Checkpoint cadastrado com sucesso!");
                clearForm();
                fetchCheckpoints(); // Atualiza a tabela
            }
        } catch (error) {
            console.error("Erro no handleSubmit:", error);
            const errorMsg = error.response?.data?.error || "Erro ao cadastrar checkpoint";
            alert(`Erro: ${errorMsg}`);
        }
    };

    // --- Função de Deletar (DELETE) ---
    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este checkpoint?")) {
            return;
        }

        try {
            // TODO: Implementar a exclusão do arquivo de imagem no backend
            // (Opcional, mas recomendado para não acumular lixo no servidor)
            const response = await deleteCheckpoint(id);
            if (response.status === 204) {
                alert("Checkpoint excluído com sucesso!");
                fetchCheckpoints(); // Atualiza a tabela
            }
        } catch (error) {
            console.error("Erro no handleDelete:", error);
            const errorMsg = error.response?.data?.error || "Erro ao excluir checkpoint";
            alert(`Erro: ${errorMsg}`);
        }
    };


    // --- Renderização JSX ---
    return (
        <>
            <div className={style.wrapperCheckpoints}>
                <div className={style.formCheckpoints}>
                    <p className={style.formTitle}>Cadastro de Checkpoints</p>

                    <form onSubmit={handleSubmit} className={style.cadastroCheckpoints}>
                        <div className={style.inputWrapper}>
                            <input 
                                type="text" 
                                placeholder="Título do Checkpoint" 
                                className={style.inputField}
                                value={nomeCheckpoint}
                                onChange={(e) => setNomeCheckpoint(e.target.value)}
                                required
                            />
                        </div>

                        <div className={style.inputWrapper}>
                            <input 
                                type="text" 
                                placeholder="Descrição do Checkpoint" 
                                className={style.inputField}
                                value={descricaoCheckpoint}
                                onChange={(e) => setDescricaoCheckpoint(e.target.value)}
                                required
                            />
                        </div>

                        {/* Select de Rotas Dinâmico */}
                        <div className={style.inputWrapper}>
                            <select
                                className={style.inputField}
                                value={rotaSelecionada}
                                onChange={(e) => setRotaSelecionada(e.target.value)}
                                required
                            >
                                <option value="" disabled>Selecione uma rota</option>
                                {rotas.length > 0 ? (
                                    rotas.map((rota) => (
                                        // Assumindo que 'rota' tem '_id' e 'nome'
                                        <option key={rota._id} value={rota.tituloRota}> 
                                            {rota.tituloRota}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Carregando rotas...</option>
                                )}
                            </select>
                        </div>

                        <div className={style.inputWrapper}>
                            <input
                                type="number"
                                step="any"
                                placeholder="Latitude (ex: -23.5505)"
                                className={style.inputField}
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                required
                            />
                        </div>

                        <div className={style.inputWrapper}>
                            <input
                                type="number"
                                step="any"
                                placeholder="Longitude (ex: -46.6333)"
                                className={style.inputField}
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                required
                            />
                        </div>

                        {/* Input de Arquivo */}
                        <div className={style.inputWrapper}>
                            <label htmlFor="upload-capaCheckpoint" className={style.uploadButton}>
                                {capaCheckpointFileName ? `Capa: ${capaCheckpointFileName}` : 'Upload de capa do checkpoint'}
                            </label>
                            <input
                                id="upload-capaCheckpoint"
                                type="file"
                                accept="image/*"
                                className={style.hiddenInput}
                                onChange={handlecapaCheckpointFileChange}
                                required 
                            />
                        </div>

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>

                <div className={style.tableContainer}>
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Imagem</th>
                                <th>Título</th>
                                <th>Descrição</th>
                                <th>Rota</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkpoints.length > 0 ? (
                                checkpoints.map((checkpoint) => (
                                    <tr key={checkpoint._id}> 
                                        <td data-label="Id">{checkpoint._id.slice(-6)}</td> 
                                        <td>
                                            <img
                                                // CORREÇÃO: Usando 'imagemCheckpoint'
                                                src={checkpoint.imagemCheckpoint || "/logo_quadrado.png"} 
                                                className={style.tableImage}
                                                alt="Capa do Checkpoint"
                                                // Fallback se a imagem não carregar
                                                onError={(e) => e.target.src = "/logo_quadrado.png"}
                                            />
                                        </td>
                                        <td data-label="Título">{checkpoint.nomeCheckpoint}</td>
                                        <td data-label="Descrição">{checkpoint.descricaoCheckpoint}</td>
                                        <td data-label="Rota">{checkpoint.tituloRota}</td>
                                        <td data-label="Latitude">{checkpoint.latitudeCheckpoint}</td>
                                        <td data-label="Longitude">{checkpoint.longitudeCheckpoint}</td>
                                        <td data-label="Ações">
                                            <button onClick={() => handleEditClick(checkpoint)} className={`${style.actionButton} ${style.editarButton}`}>
                                                Editar
                                            </button>
                                            <button onClick={() => handleDelete(checkpoint._id)} className={`${style.actionButton} ${style.excluirButton}`}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center' }}>Nenhum checkpoint encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ConsultarCheckpoints;
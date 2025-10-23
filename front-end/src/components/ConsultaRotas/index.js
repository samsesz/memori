import { useState, useEffect } from 'react';
import style from "@/components/ConsultaRotas/ConsultaRotas.module.css";
// 1. Importar as funções da sua API
import { getRotas, createRota, deleteRota } from '@/services/api';

const ConsultaRotas = () => {

    // --- Estados da API do IBGE (Cidades) ---
    const API_CIDADES_SP_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/35/municipios';
    const [cidades, setCidades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- Estados do Formulário ---
    // (Os nomes dos estados são do seu backend service)
    const [tituloRota, setTituloRota] = useState('');
    const [descricaoRota, setDescricaoRota] = useState('');
    const [cidadeLocalizada, setCidadeLocalizada] = useState('');
    const [latitude, setLatitude] = useState(''); // State do formulário
    const [longitude, setLongitude] = useState(''); // State do formulário
    
    // States para o upload de arquivo
    const [capaRotaFile, setCapaRotaFile] = useState(null); // O arquivo em si
    const [capaRotaFileName, setCapaRotaFileName] = useState(''); // O nome do arquivo

    // --- Estado da Tabela ---
    const [rotas, setRotas] = useState([]);

    // --- useEffect para buscar dados (IBGE e API Local) ---
    useEffect(() => {
        // Buscar Cidades do IBGE
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
        
        // Buscar Rotas da nossa API
        fetchRotas();
    }, []);

    // --- Funções da API Local (CRUD) ---

    const fetchRotas = async () => {
        try {
            const response = await getRotas();
            // Espera { rotas: [...] } do controller
            setRotas(response.data.rotas || []);
        } catch (error) {
            console.error("Erro no fetchRotas:", error);
            alert("Não foi possível carregar as rotas.");
        }
    };

    const handleEditClick = (rota) => {
        alert("Função de 'Editar' não implementada (MVP).");
        // Lógica: preencher o form com 'rota' e chamar updateRota no submit
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir esta rota?")) {
            return;
        }

        try {
            const response = await deleteRota(id);
            if (response.status === 204) {
                alert("Rota excluída com sucesso!");
                fetchRotas(); // Atualiza a tabela
            }
        } catch (error) {
            console.error("Erro no handleDelete:", error);
            const errorMsg = error.response?.data?.error || "Erro ao excluir rota";
            alert(`Erro: ${errorMsg}`);
        }
    };
    
    const clearForm = () => {
        setTituloRota('');
        setDescricaoRota('');
        setCidadeLocalizada('');
        setLatitude('');
        setLongitude('');
        setCapaRotaFile(null);
        setCapaRotaFileName('');
        const fileInput = document.getElementById('upload-capaRota');
        if (fileInput) fileInput.value = null;
    };

    // --- Manipuladores de Eventos do Formulário ---

    const handlecapaRotaFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            // Salva o ARQUIVO, não só o nome
            setCapaRotaFile(e.target.files[0]); 
            setCapaRotaFileName(e.target.files[0].name);
        } else {
            setCapaRotaFile(null);
            setCapaRotaFileName('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        // Adiciona os campos de texto
        // Os nomes DEvem bater com o 'req.body' esperado no controller
        formData.append('tituloRota', tituloRota);
        formData.append('descricaoRota', descricaoRota);
        formData.append('cidadeLocalizada', cidadeLocalizada);
        // Mapeia os states para os nomes do backend service
        formData.append('latituteRota', latitude); 
        formData.append('longitudeRota', longitude);

        // Adiciona o arquivo
        if (capaRotaFile) {
            // O nome 'capaRota' DEVE bater com o uploadRota.single('capaRota')
            formData.append('capaRota', capaRotaFile); 
        } else {
             alert("Por favor, selecione uma imagem de capa.");
             return;
        }

        try {
            const response = await createRota(formData); 
            if (response.status === 201) {
                alert("Rota cadastrada com sucesso!");
                clearForm();
                fetchRotas(); // Atualiza a tabela
            }
        } catch (error) {
            console.error("Erro no handleSubmit:", error);
            const errorMsg = error.response?.data?.error || "Erro ao cadastrar rota";
            alert(`Erro: ${errorMsg}`);
        }
    };

    return(
        <>
            <div className={style.wrapperRotas}> 

            {/* Formulário de Cadastro de Rotas */}
            <div className={style.formRotas}>
                <p className={style.formTitle}>Cadastro de Rotas</p> 

                {/* Alterado para usar onSubmit */}
                <form onSubmit={handleSubmit} className={style.cadastroRotas}>
                    <div className={style.inputWrapper}>
                        <input 
                            type="text" 
                            placeholder="Título da Rota" 
                            className={style.inputField}
                            value={tituloRota}
                            onChange={(e) => setTituloRota(e.target.value)}
                            required
                        />
                    </div>

                    <div className={style.inputWrapper}>
                        <input 
                            type="text" 
                            placeholder="Descrição da Rota" 
                            className={style.inputField}
                            value={descricaoRota}
                            onChange={(e) => setDescricaoRota(e.target.value)}
                            required
                        />
                    </div> 

                    {/* Input de Cidades (do IBGE) */}
                    <div className={style.inputWrapper}>
                        <input
                            type="text"
                            list="cidades-sp-lista" 
                            placeholder={isLoading ? "Carregando cidades..." : "Cidade (SP)"}
                            disabled={isLoading}
                            className={style.inputField} 
                            value={cidadeLocalizada}
                            onChange={(e) => setCidadeLocalizada(e.target.value)}
                            required
                        />
                        <datalist id="cidades-sp-lista">
                            {cidades.map((cidade) => (
                                <option key={cidade.id} value={cidade.nome} />
                            ))}
                        </datalist>
                    </div> 

                    {/* Inputs de Latitude e Longitude */}
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
                    
                    {/* Input de Upload de Imagem */}
                    <div className={style.inputWrapper}>
                        <label htmlFor="upload-capaRota" className={style.uploadButton}>
                            {capaRotaFileName ? `Capa: ${capaRotaFileName}` : 'Upload de capa da Rota'}
                        </label>
                        <input 
                            id="upload-capaRota"
                            type="file" 
                            accept="image/*"
                            className={style.hiddenInput}
                            onChange={handlecapaRotaFileChange}
                            required
                        />
                    </div> 
                    
                    <button type="submit">Cadastrar</button>
                </form>
            </div>

            {/* Tabela Dinâmica */}
            <div className={style.tableContainer}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Imagem</th>
                            <th>Título</th>
                            <th>Descrição</th>
                            <th>Cidade</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rotas.length > 0 ? (
                            rotas.map((rota) => (
                                <tr key={rota._id}>
                                    <td data-label="Id">{rota._id.slice(-6)}</td>
                                    <td>
                                        <img 
                                            // Usa o campo 'imagemCapa' do seu backend service
                                            src={rota.imagemCapa || "/logo_quadrado.png"} 
                                            className={style.tableImage} 
                                            alt="Capa da Rota"
                                            onError={(e) => e.target.src = "/logo_quadrado.png"}
                                        />
                                    </td>
                                    {/* Usa os campos do seu backend service */}
                                    <td data-label="Título">{rota.tituloRota}</td>
                                    <td data-label="Descrição">{rota.descricaoRota}</td>
                                    <td data-label="Cidade">{rota.cidadeLocalizada}</td>
                                    <td data-label="Latitude">{rota.latituteRota}</td> 
                                    <td data-label="Longitude">{rota.longitudeRota}</td>
                                    <td data-label="Ações"> 
                                        <button onClick={() => handleEditClick(rota)} className={`${style.actionButton} ${style.editarButton}`}>
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(rota._id)} className={`${style.actionButton} ${style.excluirButton}`}>
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center' }}>Nenhuma rota encontrada.</td>
                            </tr>
                        )}
                    </tbody>
                </table> 
            </div>
        </div> 
        </>
    )
}

export default ConsultaRotas;
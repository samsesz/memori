// /front-end/src/services/api.js

import axios from 'axios';

// Instância do Axios
const api = axios.create({
  baseURL: '/api' 
});

// --- Checkpoints ---
export const getCheckpoints = () => api.get('/checkpoint');
export const getOneCheckpoint = (id) => api.get(`/checkpoint/${id}`);
export const createCheckpoint = (formData) => api.post('/checkpoint', formData);
export const updateCheckpoint = (id, formData) => api.put(`/checkpoint/${id}`, formData);
export const deleteCheckpoint = (id) => api.delete(`/checkpoint/${id}`);

// --- Rotas ---
export const getRotas = () => api.get('/rota'); 
export const getOneRota = (id) => api.get(`/rota/${id}`);
export const createRota = (formData) => api.post('/rota', formData);
export const updateRota = (id, formData) => api.put(`/rota/${id}`, formData);
export const deleteRota = (id) => api.delete(`/rota/${id}`);

// --- Quizzes (NOVOS) ---

/**
 * Busca todos os quizzes.
 * Rota: GET /quiz
 */
export const getQuizzes = () => api.get('/quiz');

/**
 * Busca um único quiz pelo ID.
 * Rota: GET /quiz/:id
 */
export const getOneQuiz = (id) => api.get(`/quiz/${id}`);

/**
 * Cria um novo quiz. (Envia JSON, não FormData)
 * Rota: POST /quiz
 * @param {object} quizData - Dados do quiz em JSON.
 */
export const createQuiz = (quizData) => {
  return api.post('/quiz', quizData); // Envia JSON
};

/**
 * Atualiza um quiz existente. (Envia JSON)
 * Rota: PUT /quiz/:id
 */
export const updateQuiz = (id, quizData) => {
  return api.put(`/quiz/${id}`, quizData); // Envia JSON
};

/**
 * Exclui um quiz.
 * Rota: DELETE /quiz/:id
 */
export const deleteQuiz = (id) => api.delete(`/quiz/${id}`);

export default api;
import quizService from "../services/quizService.js";
import { ObjectId } from "mongodb";
 
//Função para listar todos os Quizzes
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizService.getAll();
    res.status(200).json({ quizzes: quizzes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
 
// Função para criar um Quizz
const createQuiz = async (req, res) => {
  try {
    const {
      pergunta,
      checkpointQuiz,
      alternativaA,
      alternativaB,
      alternativaC,
      alternativaD,
      alternativaCorreta,
    } = req.body;
    await quizService.Create(
      pergunta,
      checkpointQuiz,
      alternativaA,
      alternativaB,
      alternativaC,
      alternativaD,
      alternativaCorreta,
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
 
// Função para deletar um Quizz
const deleteQuiz = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await quizService.Delete(id);
      res.sendStatus(204);
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
 
// Função para atualizar Quizz
const updateQuiz = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const {
        pergunta,
        checkpointQuiz,
        alternativaA,
        alternativaB,
        alternativaC,
        alternativaD,
        alternativaCorreta,
      } = req.body;
      const quiz = await quizService.Update(
        id,
        pergunta,
        checkpointQuiz,
        alternativaA,
        alternativaB,
        alternativaC,
        alternativaD,
        alternativaCorreta
      );
      res.status(200).json({ quiz });
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
 
const getOneQuiz = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const quiz = await quizService.getOne(id);
      if (!quiz) {
        res.status(400).json({ error: "Quiz não encontrado. " });
      } else {
        res.status(200).json({ quiz });
      }
    } else {
      res.status(400).json({ error: "A ID enviada é inválida." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
export default {
  getAllQuizzes,
  createQuiz,
  deleteQuiz,
  updateQuiz,
  getOneQuiz,
};
 
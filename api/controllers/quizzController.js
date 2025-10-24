import quizzService from "../services/quizzService.js";
import { ObjectId } from "mongodb";

//Função para listar todos os Quizzes
const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizzService.getAll();
    res.status(200).json({ quizzes: quizzes });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para criar um Quizz
const createQuizz = async (req, res) => {
  try {
    const {
      pergunta,
      checkpointQuizz,
      alternativaA,
      alternativaB,
      alternativaC,
      alternativaD,
      alternativaCorreta,
    } = req.body;
    await quizzService.Create({
      pergunta,
      checkpointQuizz,
      alternativaA,
      alternativaB,
      alternativaC,
      alternativaD,
      alternativaCorreta,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para deletar um Quizz
const deleteQuizz = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await quizzService.Delete(id);
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
const updateQuizz = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const {
        pergunta,
        checkpointQuizz,
        alternativaA,
        alternativaB,
        alternativaC,
        alternativaD,
        alternativaCorreta,
      } = req.body;
      const quizz = await quizzService.Update(
        pergunta,
        checkpointQuizz,
        alternativaA,
        alternativaB,
        alternativaC,
        alternativaD,
        alternativaCorreta
      );
      res.status(200).json({ modelagem });
    } else {
      res.status(400).json({ error: "A ID enviada é inválida. " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const getOneQuizz = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const quizz = await quizzService.getOne(id);
      if (!quizz) {
        res.status(400).json({ error: "Quizz não encontrado. " });
      } else {
        res.statys(200).json({ modelagem });
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
  createQuizz,
  deleteQuizz,
  updateQuizz,
  getOneQuizz,
};

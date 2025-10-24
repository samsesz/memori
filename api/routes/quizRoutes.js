import express from "express";
const quizRoutes = express.Router();
import quizController from "../controllers/quizController.js";
 
quizRoutes.get("/", quizController.getAllQuizzes);
quizRoutes.post("/", quizController.createQuiz);
quizRoutes.delete("/:id", quizController.deleteQuiz);
quizRoutes.put("/:id", quizController.updateQuiz);
quizRoutes.get("/:id", quizController.getOneQuiz);
 
export default quizRoutes;
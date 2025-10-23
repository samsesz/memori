import mongoose from "mongoose";

const quizzesSchema = new mongoose.Schema({
    pergunta: String,
    checkpointQuiz: String,
    alternativaA: String,
    alternativaB: String,
    alternativaC: String,
    alternativaD: String,
    alternativaCorreta: String
});
const Quizzes = mongoose.model("Quizzes", quizzesSchema);
export default Quizzes;
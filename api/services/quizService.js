import Quiz from "../models/Quizzes.js";
 
class quizService {
  async getAll() {
    try {
      const quizzes = await Quiz.find();
      return quizzes;
    } catch (error) {
      console.log(error);
    }
  }
 
  async Create(
    pergunta,
    checkpointQuiz,
    alternativaA,
    alternativaB,
    alternativaC,
    alternativaD,
    alternativaCorreta
  ) {
    try {
      const newQuiz = new Quiz({
        pergunta,
        checkpointQuiz,
        alternativaA,
        alternativaB,
        alternativaC,
        alternativaD,
        alternativaCorreta,
      });
      await newQuiz.save();
    } catch (error) {
      console.log(error);
    }
  }
 
  async Delete(id) {
    try {
      await Quiz.findByIdAndDelete(id);
      console.log(`Quizz com id ${id} deletada com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }
 
  async Update(id,pergunta, checkpointQuiz, alternativaA, alternativaB, alternativaC, alternativaD, alternativaCorreta,) {
    try {
      const quiz = await Quiz.findByIdAndUpdate(
        id,
        {
        pergunta,
        checkpointQuiz,
        alternativaA,
        alternativaB,
        alternativaC,
        alternativaD,
        alternativaCorreta,
        },
        { new: true }
      );
      console.log(`Quiz com id ${id} atualizada com sucesso!`);
      return quiz;
    } catch (error) {
      console.log(error);
    }
  }
 
  async getOne(id) {
    try {
      const quiz = await Quiz.findOne({ _id: id });
      return quiz;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new quizService();
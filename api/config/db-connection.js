import mongoose from "mongoose";

const dbUser = "samiamunizmuniz_db_user";
const dbPassword = "CoiVzOi47TMEKd2I";
const dbName = "api-memori";

const connect = () => {
    mongoose.connect(`mongodb+srv://samiamunizmuniz_db_user:CoiVzOi47TMEKd2I@cluster0.0eqnlx8.mongodb.net/?appName=Cluster0`)
};

const connection = mongoose.connection;

connection.on("error", (err) => {
    console.log("Erro na conexão com o banco de dados:", err);
});
connection.once("open", () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
});

connect();
export default mongoose;
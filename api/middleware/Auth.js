import jwt from "jsonwebtoken";
import usuarioController from "../controllers/usuarioController.js";

// Função de autenticação para verificar se o usuario esta enviando o token e se ele é valido
const Authorization = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    //Dividindo a string do token (eliminar palavra bearer)
    const bearer = authToken.split(" ");
    const token = bearer[1];
    //Validando o token
    jwt.verify(token, usuarioController.jwtSecret, (error, data) => {
      if (error) {
        res.status(401).json({ error: "token invalido" });
        // token valido
      } else {
        req.token = token;
        req.loggedUser = {
          id: data.id,
          email: data.email,
        }
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Acesso não autorizado" });
  }
};

export default Authorization;
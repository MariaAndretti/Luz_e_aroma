
const express = require("express");
const cors = require("cors");
const routes = require("./config/routes");
const db = require("./models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
  .then(() => {
    console.log("Banco conectado com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco:", error);
  });

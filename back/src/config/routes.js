const { Router } = require("express");
const produtoController = require("../controllers/produtoController");
const reservaController = require("../controllers/reservaController");

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

//rota de produtos

routes.get("/produto", produtoController.index);
routes.post("/produto", produtoController.store);
routes.put("/produto/:id", produtoController.update);
routes.delete("/produto/:id", produtoController.destroy);

routes.get("/reserva", reservaController.index);
routes.post("/reserva", reservaController.store);
routes.put("/reserva/:id", reservaController.update);
routes.delete("/reserva/:id", reservaController.destroy);



module.exports = routes;

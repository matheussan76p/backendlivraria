// ============================
//  Dependências
// ============================
import express from "express";

import bodyParser from "body-parser";
import cors from "cors";
import usuariosRoutes from "./routes/usuario.routes.js";

// ============================
//  Configuração do servidor
// ============================
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("🚀 API funcionando!");
});


// ============================
//  Rotas
// ============================
app.use("/usuarios", usuariosRoutes);


// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));

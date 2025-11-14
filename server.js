// ============================
//  Dependências
// ============================
import express from "express";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";
import cors from "cors";

// ============================
//  Configuração do servidor
// ============================
const app = express();
app.use(cors());
app.use(bodyParser.json());

// ============================
//  Conexão com o MariaDB
// ============================
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dblivraria",
  port: 3306,
});

console.log("✅ Conectado ao banco de dados dblivraria!");

// ============================
//  Rotas CRUD
// ============================


app.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );

    res.json({ mensagem: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


app.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


app.get("/usuarios/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    await db.execute(
      "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?",
      [nome, email, senha, req.params.id]
    );
    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


app.delete("/usuarios/:id", async (req, res) => {
  try {
    await db.execute("DELETE FROM usuarios WHERE id = ?", [req.params.id]);
    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

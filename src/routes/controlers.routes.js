import db from "../db.js";

// ============================
//   CONTROLADOR DE RESERVAS
// ============================

export const listarReservas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, 
             u.nome AS usuario_nome, 
             l.titulo AS livro_titulo
      FROM reservas r
      JOIN usuarios u ON r.usuario_id = u.id
      JOIN livros l ON r.livro_id = l.id
    `);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao listar reservas:", error);
    res.status(500).json({ erro: "Erro ao listar reservas." });
  }
};

export const criarReserva = async (req, res) => {
  try {
    const { usuario_id, livro_id, data_retirada, data_devolucao } = req.body;

    // Verificar se o livro está ativo
    const [livro] = await db.query("SELECT ativo FROM livros WHERE id = ?", [livro_id]);
    if (!livro.length || !livro[0].ativo) {
      return res.status(400).json({ erro: "Livro inativo ou não encontrado." });
    }

    const [result] = await db.query(
      "INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao) VALUES (?, ?, ?, ?)",
      [usuario_id, livro_id, data_retirada, data_devolucao]
    );

    res.status(201).json({ mensagem: "Reserva criada com sucesso!", id: result.insertId });
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    res.status(500).json({ erro: "Erro ao criar reserva." });
  }
};

export const excluirReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query("DELETE FROM reservas WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Reserva não encontrada." });
    }

    res.json({ mensagem: "Reserva excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir reserva:", error);
    res.status(500).json({ erro: "Erro ao excluir reserva." });
  }
};

// 🔹 Desafio Extra - listar reservas ativas
export const listarReservasAtivas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, u.nome AS usuario_nome, l.titulo AS livro_titulo
      FROM reservas r
      JOIN usuarios u ON r.usuario_id = u.id
      JOIN livros l ON r.livro_id = l.id
      WHERE r.data_devolucao >= CURDATE()
    `);
    res.json(rows);
  } catch (error) {
    console.error("Erro ao listar reservas ativas:", error);
    res.status(500).json({ erro: "Erro ao listar reservas ativas." });
  }
};
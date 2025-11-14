import express from "express";
import {
  listarReservas,
  criarReserva,
  excluirReserva,
  listarReservasAtivas
} from "../controllers/reservas.controller.js";

const router = express.Router();

router.get("/reservas", listarReservas);
router.post("/reservas", criarReserva);
router.delete("/reservas/:id", excluirReserva);

// 🔹 Desafio Extra
router.get("/reservas/ativas", listarReservasAtivas);

export default router;
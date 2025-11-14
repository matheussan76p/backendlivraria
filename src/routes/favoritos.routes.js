import express from "express";
import {
  listarFavoritos,
  criarFavorito,
  excluirFavorito,
  listarFavoritosPorUsuario
} from "../controllers/favoritos.controller.js";

const router = express.Router();

router.get("/favoritos", listarFavoritos);
router.post("/favoritos", criarFavorito);
router.delete("/favoritos/:id", excluirFavorito);

// 🔹 Desafio Extra
router.get("/favoritos/usuario/:id", listarFavoritosPorUsuario);

export default router;

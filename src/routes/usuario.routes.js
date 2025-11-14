import {
  criarUsuario,
  listaUsuario,
  obterUsuario,
  atualizarUsuario,
  deletarUsuario
} from '../controllers/usuarios.controller.js';

import express from"express"; 

const route = express.Router(); 

route.get("/",listaUsuario); 
route.post("/",criarUsuario); 
route.get("/",obterUsuario); 
route.put("/",atualizarUsuario); 
route.delete("/",deletarUsuario); 


export default route; 


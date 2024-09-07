import { Router } from "express";
import login, { logout } from "../Seguranca/autenticar.js";

const rotaAutenticacao = Router(); 


rotaAutenticacao.post('/login', login);
rotaAutenticacao.get('/logout', logout);

export default rotaAutenticacao;

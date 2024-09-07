import { Router } from "express";
import LivroCtrl from "../Controle/livroCtrl.js";

const livroCtrl = new LivroCtrl();
const rotaLivro = new Router();

rotaLivro
    .get('/', livroCtrl.consultar)
    .get('/:termo', livroCtrl.consultar)
    .post('/', livroCtrl.gravar)
    .post('/autor', livroCtrl.adicionarAutorAoLivro);

export default rotaLivro;

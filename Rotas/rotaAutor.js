import { Router } from "express";
import AutorCtrl from "../Controle/autorCtrl.js";

const autorCtrl = new AutorCtrl();
const rotaAutor = new Router();

rotaAutor
    .get('/', autorCtrl.consultar)
    .get('/:termo', autorCtrl.consultar)
    .post('/', autorCtrl.gravar)
    .post('/livro', autorCtrl.adicionarLivroAoAutor);

export default rotaAutor;

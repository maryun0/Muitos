import { Router } from "express";
import AutorLivroCtrl from "../Controle/autorLivroCtrl.js";

const rotaAutorLivro = new Router();
const autorLivroCtrl = new AutorLivroCtrl();

rotaAutorLivro
  .get('/:termo', autorLivroCtrl.consultar)
  .post('/', autorLivroCtrl.gravar);
// .patch('/', autorLivroCtrl.atualizar)
// .put('/', autorLivroCtrl.atualizar)
// .delete('/', autorLivroCtrl.excluir);

export default rotaAutorLivro;

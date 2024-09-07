import { Router } from "express";
import AutorLivroCtrl from "../Controle/autorLivroCtrl.js";

const autorLivroCtrl = new AutorLivroCtrl();
const rotaAutorLivro = new Router();

rotaAutorLivro
    .post('/associar', autorLivroCtrl.associarAutorLivro) // Rota para associar
    .delete('/desassociar', autorLivroCtrl.desassociarAutorLivro)
    .get('/autor/:autorCodigo', autorLivroCtrl.consultarLivrosPorAutor)
    .get('/livro/:livroCodigo', autorLivroCtrl.consultarAutoresPorLivro);

export default rotaAutorLivro;

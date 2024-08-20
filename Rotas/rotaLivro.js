import { Router } from "express";
import LivroCtrl from "../Controle/livroCtrl.js";

// Instancia o controlador de livros
const livroCtrl = new LivroCtrl();
const rotaLivro = new Router();

rotaLivro
    .get('/', livroCtrl.consultar)              // Consulta todos os livros ou com termo
    .get('/:termo', livroCtrl.consultar)        // Consulta livros por termo específico
    .post('/', livroCtrl.gravar)                // Grava um novo livro
    .patch('/', livroCtrl.atualizar)            // Atualiza informações de um livro (parcialmente)
    .put('/', livroCtrl.atualizar)              // Atualiza informações de um livro (completamente)
    .delete('/', livroCtrl.excluir);            // Exclui um livro

export default rotaLivro;

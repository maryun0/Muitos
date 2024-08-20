import { Router } from "express";
import AutorCtrl from "../Controle/autorCtrl.js";

// Instancia o controlador de autores
const autorCtrl = new AutorCtrl();
const rotaAutor = new Router();

rotaAutor
    .get('/', autorCtrl.consultar)              
    .get('/:termo', autorCtrl.consultar)        
    .post('/', autorCtrl.gravar)                
    .patch('/', autorCtrl.atualizar)           
    .put('/', autorCtrl.atualizar)              
    .delete('/', autorCtrl.excluir);        

export default rotaAutor;

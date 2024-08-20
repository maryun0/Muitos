import LivroDAO from "../Persistencia/livroDAO.js";
import Autor from "./autor.js";

export default class Livro {
    
    #codigo;
    #nome;
    #data;
    #qtdeEstoque;
    #autor;

    constructor(codigo = 0, nome = '', data = '', qtdeEstoque=0, autor = null) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#data = data;
        this.#qtdeEstoque = qtdeEstoque;
        this.#autor = autor;
    }

    
    get data() {
        return this.#data;
    }
    set data(novaData) {
        this.#data = novaData;
    }
    get qtdeEstoque() {
        return this.#qtdeEstoque;
    }
    set qtdeEstoque(novaQtdeEstoque) {
        this.#qtdeEstoque = novaQtdeEstoque;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get autor() {
        return this.#autor;
    }

    set autor(novoAutor) {
        if (novoAutor instanceof Autor) {
            this.#autor = novoAutor;
        } else {
            throw new Error("O autor deve ser uma instância da classe Autor");
        }
    }

    
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            data: this.#data,
            qtdeEstoque: this.#qtdeEstoque,
            autor: this.#autor.toJSON() 
        };
    }

   
    async gravar() {
        const livroDAO = new LivroDAO();
        await livroDAO.gravar(this);
    }

    async excluir() {
        const livroDAO = new LivroDAO();
        await livroDAO.excluir(this);
    }

    async atualizar() {
        const livroDAO = new LivroDAO();
        await livroDAO.atualizar(this);
    }

    async consultar(parametro) {
        const livroDAO = new LivroDAO();
        return await livroDAO.consultar(parametro);
    }
}

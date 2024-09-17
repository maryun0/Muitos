import LivroDAO from "../Persistencia/livroDAO.js";
import Autor from "./autor.js";

export default class Livro {
    #codigo;
    #titulo;
    #isbn;
    #dataPublicacao;
    #autor;

    constructor(codigo = 0, titulo = "", isbn = "", dataPublicacao = '', autor = null) {
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#isbn = isbn;
        this.#dataPublicacao = dataPublicacao;
        this.#autor = autor;
    }

    get codigo() {
        return this.#codigo;
    }
    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get titulo() {
        return this.#titulo;
    }
    set titulo(novoTitulo) {
        this.#titulo = novoTitulo;
    }

    get isbn() {
        return this.#isbn;
    }
    set isbn(novoIsbn) {
        this.#isbn = novoIsbn;
    }

    get dataPublicacao() {
        return this.#dataPublicacao;
    }
    set dataPublicacao(novaData) {
        this.#dataPublicacao = novaData;
    }

    get autor() {
        return this.#autor;
    }
    set autor(novoAutor) {   
        if (novoAutor instanceof Autor) {
            this.#autor = novoAutor;
        }
    }  

    toJSON() {
        return {
            codigo: this.#codigo,
            titulo: this.#titulo,
            isbn: this.#isbn,
            dataPublicacao: new Date(this.#dataPublicacao).toLocaleDateString(),
            autor: this.#autor ? this.#autor.toJSON() : null
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

    async alterar() {
        const livroDAO = new LivroDAO();
        await livroDAO.atualizar(this);
    }

    async consultar(termo) {
        const livroDAO = new LivroDAO();
        return await livroDAO.consultar(termo);
    }
}

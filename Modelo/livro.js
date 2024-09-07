import LivroDAO from "../Persistencia/livroDAO.js";
import AutorLivroDAO from "../Persistencia/autorLivroDAO.js";

export default class Livro {
    #codigo;
    #titulo;
    #dataPublicacao;
    #numeroPaginas;

    constructor(codigo = 0, titulo = "", dataPublicacao = '', numeroPaginas = 0) {
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#dataPublicacao = dataPublicacao;
        this.#numeroPaginas = numeroPaginas;
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

    get dataPublicacao() {
        return this.#dataPublicacao;
    }

    set dataPublicacao(novaDataPublicacao) {
        this.#dataPublicacao = novaDataPublicacao;
    }

    get numeroPaginas() {
        return this.#numeroPaginas;
    }

    set numeroPaginas(novaQtdPaginas) {
        this.#numeroPaginas = novaQtdPaginas;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            titulo: this.#titulo,
            dataPublicacao: this.#dataPublicacao,
            numeroPaginas: this.#numeroPaginas
        };
    }

    async gravar() {
        const livroDAO = new LivroDAO();
        await livroDAO.gravar(this);
    }

    async atualizar() {
        const livroDAO = new LivroDAO();
        await livroDAO.atualizar(this);
    }

    async excluir() {
        const livroDAO = new LivroDAO();
        await livroDAO.excluir(this);
    }

    async consultar(termo) {
        const livroDAO = new LivroDAO();
        return await livroDAO.consultar(termo);
    }

    async adicionarAutor(autor) {
        const autorLivroDAO = new AutorLivroDAO();
        await autorLivroDAO.adicionarAutorLivro(autor.codigo, this.codigo);
    }
}

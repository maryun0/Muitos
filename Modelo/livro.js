import LivroDAO from "../Persistencia/livroDAO.js";

export default class Livro {
    #codigo;
    #titulo;
    #autorId;
    #dataPublicacao;
    #numeroPaginas;

    constructor(codigo = 0, titulo = "", autorId = 0, 
                dataPublicacao = '', numeroPaginas = 0
               ) {
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#autorId = autorId;
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

    get autorId() {
        return this.#autorId;
    }

    set autorId(novoAutorId) {
        this.#autorId = novoAutorId;
    }

    get dataPublicacao() {
        return this.#dataPublicacao;
    }

    set dataPublicacao(novaData) {
        this.#dataPublicacao = novaData;
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
            autorId: this.#autorId,
            dataPublicacao: this.#dataPublicacao,
            numeroPaginas: this.#numeroPaginas,
        }
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

import AutorDAO from "../Persistencia/autorDAO.js";
import AutorLivroDAO from "../Persistencia/autorLivroDAO.js";

export default class Autor {
    #codigo;
    #nome;
    #biografia;

    constructor(codigo = 0, nome = '', biografia = '') {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#biografia = biografia;
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

    get biografia() {
        return this.#biografia;
    }

    set biografia(novaBiografia) {
        this.#biografia = novaBiografia;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            biografia: this.#biografia
        };
    }

    async gravar() {
        const autorDAO = new AutorDAO();
        await autorDAO.gravar(this);
    }

    async excluir() {
        const autorDAO = new AutorDAO();
        await autorDAO.excluir(this);
    }

    async atualizar() {
        const autorDAO = new AutorDAO();
        await autorDAO.atualizar(this);
    }

    async consultar(parametro) {
        const autorDAO = new AutorDAO();
        return await autorDAO.consultar(parametro);
    }

    async adicionarLivro(livro) {
        const autorLivroDAO = new AutorLivroDAO();
        await autorLivroDAO.adicionarAutorLivro(this.codigo, livro.codigo);
    }
}

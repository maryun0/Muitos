import AutorDAO from "../Persistencia/autorDAO.js";


export default class Autor {

    #codigo;
    #nome;

    constructor(codigo = 0, nome = '') {
        this.#codigo = codigo;
        this.#nome = nome;
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


    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome
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

    async possuiLivros() {
        const autorDAO = new AutorDAO();
        return await autorDAO.possuiLivros(this);
    }
}

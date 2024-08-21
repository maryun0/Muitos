import AutorDAO from "../Persistencia/autorDAO.js";

export default class Autor {
    // Definição dos atributos privados
    #codigo;
    #nome;
    #biografia;

    constructor(codigo = 0, nome = '', biografia = '') {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#biografia = biografia;
    }

    // Métodos de acesso públicos

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

    // Override do método toJSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            biografia: this.#biografia
        }
    }

    // Camada de modelo acessa a camada de persistência
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
}

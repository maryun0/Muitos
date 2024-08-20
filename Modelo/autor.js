import AutorDAO from "../Persistencia/autorDAO.js";

export default class Livro {
    // definição dos atributos privados
    #codigo;
    #nome;
    

    constructor(codigo = 0, nome = '') {
        this.#codigo = codigo;
        this.#nome = nome;
// chave estrangeira para o autor
    }

    // métodos de acesso públicos

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

   
    // override do método toJSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
 // inclui o código do autor
        };
    }

    // camada de modelo acessa a camada de persistencia
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
    async possuiLivro() {
        const autorDAO = new AutorDAO();
        return await autorDAO.possuiLivro(this);
    }
}

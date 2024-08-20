import LivroDAO from "../Persistencia/livroDAO.js";

export default class Livro {
    // definição dos atributos privados
    #codigo;
    #nome;
    #autorCodigo;

    constructor(codigo = 0, nome = '', autorCodigo = 0) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#autorCodigo = autorCodigo; // chave estrangeira para o autor
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

    get autorCodigo() {
        return this.#autorCodigo;
    }

    set autorCodigo(novoAutorCodigo) {
        this.#autorCodigo = novoAutorCodigo;
    }

    // override do método toJSON
    toJSON() {
        return {
            codigo: this.#codigo,
            nome: this.#nome,
            autorCodigo: this.#autorCodigo // inclui o código do autor
        };
    }

    // camada de modelo acessa a camada de persistencia
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
    async possuiLivros() {
        const livroDAO = new LivroDAO();
        return await livroDAO.possuiLivros(this);
    }
}

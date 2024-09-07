import AutorLivroDAO from '../Persistencia/autorLivroDAO.js'; // Certifique-se de que o caminho está correto

export default class AutorLivro {
    #autorCodigo;
    #livroCodigo;

    constructor(autorCodigo, livroCodigo) {
        this.#autorCodigo = autorCodigo;
        this.#livroCodigo = livroCodigo;
    }

    get autorCodigo() {
        return this.#autorCodigo;
    }

    get livroCodigo() {
        return this.#livroCodigo;
    }

    async associar() {
        const autorLivroDAO = new AutorLivroDAO();
        await autorLivroDAO.adicionarAutorLivro(this.#autorCodigo, this.#livroCodigo);
    }

    async desassociar() {
        const autorLivroDAO = new AutorLivroDAO();
        await autorLivroDAO.removerAutorLivro(this.#autorCodigo, this.#livroCodigo);
    }
}

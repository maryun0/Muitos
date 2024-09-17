export default class AutorLivro {
    #autor;
    #livro;
    
    constructor(autor, livro) {
        this.#autor = autor;
        this.#livro = livro;
    }

   
    get autor() {
        return this.#autor;
    }

    set autor(novoAutor) {
        this.#autor = novoAutor;
    }

    get livro() {
        return this.#livro;
    }

    set livro(novoLivro) {
        this.#livro = novoLivro;
    }

 
    toJSON() {
        return {
            'autor': this.#autor,
            'livro': this.#livro
        };
    }
}

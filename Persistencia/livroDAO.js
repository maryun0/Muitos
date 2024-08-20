import Livro from "../Modelo/livro.js";
import Autor from "../Modelo/autor.js";
import conectar from "./conexao.js";

export default class LivroDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); 
            const sql = `
                    CREATE TABLE IF NOT EXISTS livro(
                        livro_codigo INT NOT NULL AUTO_INCREMENT,
                        livro_nome VARCHAR(100) NOT NULL,
                        livro_data DATETIME,
                        livroqtdeestoque INT NOT NULL,
                        autor_codigo INT NOT NULL,
                        primary key(livro_codigo),
                        CONSTRAINT fk_autor FOREIGN KEY (autor_codigo) REFERENCES autor(autor_codigo)
                    );`;
            await conexao.execute(sql);
            await conexao.release();
        } catch (error) {
            console.error("Erro na inicialização do banco de dados:", error);
        }
    }

    async gravar(livro) {
        if (livro instanceof Livro) {
            const sql = "INSERT INTO livro(livro_nome, livro_data, livro_qtde_estoque, autor_codigo) VALUES(?, ?, ?, ?)";
            const parametros = [livro.nome, livro.data, livro.qtdeEstoque, livro.autor.codigo];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros); 
            livro.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(livro) {
        if (livro instanceof Livro) {
            const sql = "UPDATE livro SET livro_nome = ?, livro_data = ?, livroqtdeestoque = ?, autor_codigo = ? WHERE livro_codigo = ?";
            const parametros = [livro.nome, livro.data, livro.qtdeEstoque, livro.autor.codigo, livro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(livro) {
        if (livro instanceof Livro) {
            const sql = "DELETE FROM livro WHERE livro_codigo = ?";
            const parametros = [livro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        let sql = '';
        const conexao = await conectar();
        let listaLivro = [];

        if (!isNaN(parseInt(termo))) {
            sql = `
                SELECT l.livro_codigo, l.livro_nome, l.livro_data, l.livro_qtde_estoque, a.autor_codigo, a.autor_nome
                FROM livro l
                INNER JOIN autor a ON l.autor_codigo = a.autor_codigo
                WHERE l.livro_codigo = ?
                ORDER BY l.livro_nome`;
            const parametros = [termo];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const livro = new Livro(registro.livro_codigo, registro.livro_nome, registro.livro_data, registro.livro_qtde_estoque);
                listaLivro.push(livro);
            }
        } else {
            sql = `
                SELECT l.livro_codigo, l.livro_nome, l.livro_data, l.livro_qtde_estoque, a.autor_codigo, a.autor_nome
                FROM livro l
                INNER JOIN autor a ON l.autor_codigo = a.autor_codigo
                WHERE l.livro_nome LIKE ? 
                OR a.autor_nome LIKE ?
                ORDER BY l.livro_nome`;
            const parametros = ['%' + termo + '%'];
            const [registros] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const autor = new Autor(registro.autor_codigo, registro.autor_nome);
                const livro = new Livro(registro.livro_codigo, registro.livro_nome, registro.livro_data, registro.livro_qtde_estoque, autor);
                listaLivro.push(livro);
            }
        }
        return listaLivro;
    }
}

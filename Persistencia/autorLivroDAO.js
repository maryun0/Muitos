import conectar from './conexao.js';

export default class AutorLivroDAO {
    async adicionarAutorLivro(autorCodigo, livroCodigo) {
        const sql = `INSERT INTO autor_livro (autor_codigo, livro_codigo) VALUES (?, ?)`;
        const parametros = [autorCodigo, livroCodigo];
        const conexao = await conectar();
        await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);
    }

    async removerAutorLivro(autorCodigo, livroCodigo) {
        const sql = `DELETE FROM autor_livro WHERE autor_codigo = ? AND livro_codigo = ?`;
        const parametros = [autorCodigo, livroCodigo];
        const conexao = await conectar();
        await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);
    }

    async consultarLivrosPorAutor(autorCodigo) {
        const sql = `SELECT l.* FROM livro l INNER JOIN autor_livro al ON l.livro_codigo = al.livro_codigo WHERE al.autor_codigo = ?`;
        const parametros = [autorCodigo];
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);
        return registros;
    }

    async consultarAutoresPorLivro(livroCodigo) {
        const sql = `SELECT a.* FROM autor a INNER JOIN autor_livro al ON a.autor_codigo = al.autor_codigo WHERE al.livro_codigo = ?`;
        const parametros = [livroCodigo];
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);
        return registros;
    }
}

import conectar from './conexao.js';
import Livro from '../Modelo/livro.js';

export default class LivroDAO {
    async gravar(livro) {
        if (livro instanceof Livro) {
            const sql = `INSERT INTO livro(livro_titulo, livro_dataPublicacao, livro_numeroPaginas) VALUES(?,?,?)`;
            const parametros = [livro.titulo, livro.dataPublicacao, livro.numeroPaginas];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            livro.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(livro) {
        if (livro instanceof Livro) {
            const sql = `UPDATE livro SET livro_titulo = ?, livro_dataPublicacao = ?, livro_numeroPaginas = ? WHERE livro_codigo = ?`;
            const parametros = [livro.titulo, livro.dataPublicacao, livro.numeroPaginas, livro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(livro) {
        if (livro instanceof Livro) {
            const sql = `DELETE FROM livro WHERE livro_codigo = ?`;
            const parametros = [livro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        let sql;
        let parametros;
        if (!isNaN(parseInt(termo))) {
            sql = `SELECT * FROM livro WHERE livro_codigo = ? ORDER BY livro_titulo`;
            parametros = [termo];
        } else {
            sql = `SELECT * FROM livro WHERE livro_titulo LIKE ? ORDER BY livro_titulo`;
            parametros = ['%' + termo + '%'];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);
        return registros.map(registro => new Livro(registro.livro_codigo, registro.livro_titulo, registro.livro_dataPublicacao, registro.livro_numeroPaginas));
    }
}

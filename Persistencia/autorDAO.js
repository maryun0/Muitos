import conectar from './conexao.js';
import Autor from '../Modelo/autor.js';

export default class AutorDAO {
    async gravar(autor) {
        if (autor instanceof Autor) {
            const sql = `INSERT INTO autor(autor_nome, autor_biografia) VALUES(?, ?)`;
            const parametros = [autor.nome, autor.biografia];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            autor.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(autor) {
        if (autor instanceof Autor) {
            const sql = `UPDATE autor SET autor_nome = ?, autor_biografia = ? WHERE autor_codigo = ?`;
            const parametros = [autor.nome, autor.biografia, autor.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(autor) {
        if (autor instanceof Autor) {
            const sql = `DELETE FROM autor WHERE autor_codigo = ?`;
            const parametros = [autor.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM autor WHERE autor_codigo = ? ORDER BY autor_nome';
            parametros = [parametroConsulta];
        } else {
            sql = "SELECT * FROM autor WHERE autor_nome LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);
        return registros.map(registro => new Autor(registro.autor_codigo, registro.autor_nome, registro.autor_biografia));
    }
}

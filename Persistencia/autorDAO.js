import conectar from './conexao.js';
import Autor from '../Modelo/autor.js';

export default class AutorDAO {

    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar(); 
            const sql = `
            CREATE TABLE IF NOT EXISTS autor(
                autor_codigo INT NOT NULL AUTO_INCREMENT,
                autor_nome VARCHAR(100) NOT NULL,
                autor_biografia TEXT,
                CONSTRAINT pk_autor PRIMARY KEY(autor_codigo)
            );`;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

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
            const conexao = await conectar();

            try {
                const sqlLivros = `DELETE FROM livro WHERE livro_autorId = ?`;
                await conexao.execute(sqlLivros, [autor.codigo]);
                const sqlAutor = `DELETE FROM autor WHERE autor_codigo = ?`;
                await conexao.execute(sqlAutor, [autor.codigo]);
                console.log("Autor e seus livros associados foram excluídos com sucesso.");
            } catch (erro) {
                console.error("Erro ao excluir o autor e seus livros: " + erro.message);
            } finally {
                global.poolConexoes.releaseConnection(conexao);
            }
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM autor WHERE autor_codigo = ? ORDER BY autor_nome';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM autor WHERE autor_nome LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaAutores = [];
        for (const registro of registros) {
            const autor = new Autor(registro.autor_codigo, registro.autor_nome, registro.autor_biografia);
            listaAutores.push(autor);
        }
        return listaAutores;
    }
}

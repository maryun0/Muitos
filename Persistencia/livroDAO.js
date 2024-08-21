import Livro from '../Modelo/livro.js';
import conectar from './conexao.js';

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
                livro_titulo VARCHAR(100) NOT NULL,
                livro_autorId INT NOT NULL,
                livro_dataPublicacao DATE,
                livro_numeroPaginas INT NOT NULL,
                CONSTRAINT pk_livro PRIMARY KEY(livro_codigo),
                CONSTRAINT fk_autor FOREIGN KEY(livro_autorId) REFERENCES autor(autor_codigo)
            )
        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(livro) {
        if (livro instanceof Livro) {
            const sql = `INSERT INTO livro(livro_titulo, livro_autorId,
                livro_dataPublicacao, livro_numeroPaginas)
                VALUES(?,?,?,?)`;
            const parametros = [livro.titulo, livro.autorId, livro.dataPublicacao, livro.numeroPaginas];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            livro.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(livro) {
        if (livro instanceof Livro) {
            const sql = `UPDATE livro SET livro_titulo = ?, livro_autorId = ?,
            livro_dataPublicacao = ?, livro_numeroPaginas = ?
            WHERE livro_codigo = ?`;
            const parametros = [livro.titulo, livro.autorId, livro.dataPublicacao, livro.numeroPaginas, livro.codigo];

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
        if (!termo){
            termo = "";
        }

        const conexao = await conectar();
        let listaLivros = [];
        if (!isNaN(parseInt(termo))) {
            const sql = `SELECT l.livro_codigo, l.livro_titulo, l.livro_autorId,
              l.livro_dataPublicacao, l.livro_numeroPaginas
              FROM livro l 
              WHERE l.livro_codigo = ?
              ORDER BY l.livro_titulo               
            `;
            const parametros = [termo];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const livro = new Livro(registro.livro_codigo, registro.livro_titulo,
                                        registro.livro_autorId, registro.livro_dataPublicacao,
                                        registro.livro_numeroPaginas);
                listaLivros.push(livro);
            }
        } else {
            const sql = `SELECT l.livro_codigo, l.livro_titulo, l.livro_autorId,
                         l.livro_dataPublicacao, l.livro_numeroPaginas
                         FROM livro l 
                         WHERE l.livro_titulo LIKE ?
                         ORDER BY l.livro_titulo`;
            const parametros = ['%' + termo + '%'];
            const [registros, campos] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const livro = new Livro(registro.livro_codigo, registro.livro_titulo,
                                        registro.livro_autorId, registro.livro_dataPublicacao,
                                        registro.livro_numeroPaginas);
                listaLivros.push(livro);
            }
        }

        return listaLivros;
    }
}

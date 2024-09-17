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
                CREATE TABLE IF NOT EXISTS livro (
                    liv_codigo INT NOT NULL AUTO_INCREMENT,
                    liv_titulo VARCHAR(200) NOT NULL,
                    liv_isbn VARCHAR(20) NOT NULL,
                    liv_data_publicacao DATE NOT NULL,
                    aut_codigo INT NOT NULL,
                    CONSTRAINT pk_livro PRIMARY KEY (liv_codigo),
                    CONSTRAINT fk_livro_autor FOREIGN KEY (aut_codigo) REFERENCES autor (aut_codigo)
                );`;
            await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao); 
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(livro) {
        if (livro instanceof Livro) {
            const sql = "INSERT INTO livro (liv_titulo, liv_isbn, liv_data_publicacao, aut_codigo) VALUES (?, ?, ?, ?)";
            const parametros = [livro.titulo, livro.isbn, livro.dataPublicacao, livro.autor.codigo];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            livro.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(livro) {
        if (livro instanceof Livro) {
            const sql = "UPDATE livro SET liv_titulo = ?, liv_isbn = ?, liv_data_publicacao = ?, aut_codigo = ? WHERE liv_codigo = ?";
            const parametros = [livro.titulo, livro.isbn, livro.dataPublicacao, livro.autor.codigo, livro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(livro) {
        if (livro instanceof Livro) {
            const sql = "DELETE FROM livro WHERE liv_codigo = ?";
            const parametros = [livro.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        if (!isNaN(parseInt(parametroConsulta))) {
           
            sql = `
                SELECT l.*, a.aut_nome
                FROM livro l
                INNER JOIN autor a ON l.aut_codigo = a.aut_codigo
                WHERE l.liv_codigo = ?
                ORDER BY l.liv_titulo`;
            parametros = [parametroConsulta];
        } else {
            
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = `
                SELECT l.*, a.aut_nome
                FROM livro l
                INNER JOIN autor a ON l.aut_codigo = a.aut_codigo
                WHERE l.liv_titulo LIKE ?
                ORDER BY l.liv_titulo`;
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);
        let listaLivros = [];
        for (const registro of registros) {
            const autor = new Autor(registro.aut_codigo, registro.aut_nome);
            const livro = new Livro(
                registro.liv_codigo,
                registro.liv_titulo,
                registro.liv_isbn,
                registro.liv_data_publicacao,
                autor
            );
            listaLivros.push(livro);
        }
        return listaLivros;
    }
}

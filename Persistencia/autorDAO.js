import Autor from "../Modelo/autor.js";
import conectar from "./conexao.js";

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
                    PRIMARY KEY(autor_codigo)
                );`;
            await conexao.execute(sql);
            await conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(autor) {
        if (autor instanceof Autor) {
            const sql = "INSERT INTO autores(autor_nome) VALUES(?)"; 
            const parametros = [autor.nome];
            const conexao = await conectar(); 
            const retorno = await conexao.execute(sql, parametros); 
            autor.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(autor) {
        if (autor instanceof Autor) {
            const sql = "UPDATE autores SET autor_nome = ? WHERE autor_codigo = ?"; 
            const parametros = [autor.nome, autor.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(autor) {
        if (autor instanceof Autor) {
            const sql = "DELETE FROM autores WHERE autor_codigo = ?"; 
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
            sql = 'SELECT * FROM autores WHERE autor_codigo = ? ORDER BY autor_nome';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM autores WHERE autor_nome LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaAutor = [];
        for (const registro of registros) {
            const autor = new Autor(registro.autor_codigo, registro.autor_nome);
            listaAutor.push(autor);
        }
        return listaAutor;
    }
    async possuiLivro(autor) {
        if (autor instanceof Autor) {
            const sql = `SELECT COUNT(*) as qtd FROM livro l
                INNER JOIN autor a ON l.autor_codigo = a.autor_codigo
                WHERE a.autor_codigo = ?`;
                const parametros = [autor.codigo];
                const registros = await global.poolConexoes.execute(sql,parametros);
                return registros[0].qtd > 0;
        }}
        
}

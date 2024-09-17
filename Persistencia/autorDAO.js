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
                    aut_codigo INT NOT NULL AUTO_INCREMENT,
                    aut_nome VARCHAR(100) NOT NULL,
                    CONSTRAINT pk_autor PRIMARY KEY(aut_codigo)
                );`;
            await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao); 
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(autor) {
        if (autor instanceof Autor) {
            const sql = "INSERT INTO autor(aut_nome) VALUES(?)"; 
            const parametros = [autor.nome];
            const conexao = await conectar(); 
            const retorno = await conexao.execute(sql, parametros); 
            autor.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(autor) {
        if (autor instanceof Autor) {
            const sql = "UPDATE autor SET aut_nome = ? WHERE aut_codigo = ?"; 
            const parametros = [autor.nome, autor.codigo];
            const conexao = await conectar(); 
            await conexao.execute(sql, parametros); 
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(autor) {
        if (autor instanceof Autor) {
           

            const sql = "DELETE FROM autor WHERE aut_codigo = ?"; 
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
        
            sql = 'SELECT * FROM autor WHERE aut_codigo = ? ORDER BY aut_nome';
            parametros = [parametroConsulta];
        } else {
          
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM autor WHERE aut_nome LIKE ? ORDER BY aut_nome";
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        global.poolConexoes.releaseConnection(conexao);
        let listaAutores = [];
        for (const registro of registros) {
            const autor = new Autor(registro.aut_codigo, registro.aut_nome);
            listaAutores.push(autor);
        }
        return listaAutores;
    }

    async possuiLivros(autor) {
        if (autor instanceof Autor) {
            const sql = `SELECT COUNT(*) AS qtd FROM livro l
                         INNER JOIN autor a ON l.aut_codigo = a.aut_codigo
                         WHERE a.aut_codigo = ?`;
            const parametros = [autor.codigo];
            const conexao = await conectar();
            const [registros] = await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
            return registros[0].qtd > 0;
        }
    }
}

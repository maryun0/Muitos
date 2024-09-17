import AutorLivro from "../Modelo/autorLivro.js";
import Autor from "../Modelo/autor.js";
import Livro from "../Modelo/livro.js";
import conectar from "./conexao.js";

export default class AutorLivroDAO {
    async gravar(autorLivro) {
        
        if (autorLivro instanceof AutorLivro) {
            const conexao = await conectar();
            
            await conexao.beginTransaction();
            try {
                // Inserir na tabela autor_livro
                const sql = 'INSERT INTO autor_livro (aut_codigo, liv_codigo) VALUES (?, ?)';
                const parametros = [autorLivro.autor.codigo, autorLivro.livro.codigo];
                await conexao.execute(sql, parametros);
                await conexao.commit(); 
            } catch (error) {
                await conexao.rollback(); 
                throw error; 
            } finally {
                global.poolConexoes.releaseConnection(conexao);
            }
        }
    }

    async excluir(autorLivro) {
        if (autorLivro instanceof AutorLivro) {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try {
                const sql = 'DELETE FROM autor_livro WHERE aut_codigo = ? AND liv_codigo = ?';
                const parametros = [autorLivro.autor.codigo, autorLivro.livro.codigo];
                await conexao.execute(sql, parametros);
                await conexao.commit();
            } catch (error) {
                await conexao.rollback();
                throw error;
            } finally {
                global.poolConexoes.releaseConnection(conexao);
            }
        }
    }

    async consultarPorAutor(autCodigo) {
        const conexao = await conectar();
        const sql = `
            SELECT al.aut_codigo, al.liv_codigo,
                   a.aut_nome,
                   l.liv_titulo, l.liv_isbn, l.liv_dataPublicacao
            FROM autor_livro al
            INNER JOIN autor a ON al.aut_codigo = a.aut_codigo
            INNER JOIN livro l ON al.liv_codigo = l.liv_codigo
            WHERE al.aut_codigo = ?`;
        const [registros] = await conexao.execute(sql, [autCodigo]);
        global.poolConexoes.releaseConnection(conexao);
        const listaLivros = [];
        for (const registro of registros) {
            const autor = new Autor(registro.aut_codigo, registro.aut_nome);
            const livro = new Livro(
                registro.liv_codigo,
                registro.liv_titulo,
                registro.liv_isbn,
                registro.liv_dataPublicacao
            );
            const autorLivro = new AutorLivro(autor, livro);
            listaLivros.push(autorLivro);
        }
        return listaLivros;
    }

    async consultarPorLivro(livCodigo) {
        const conexao = await conectar();
        const sql = `
            SELECT al.aut_codigo, al.liv_codigo,
                   a.aut_nome,
                   l.liv_titulo, l.liv_isbn, l.liv_dataPublicacao
            FROM autor_livro al
            INNER JOIN autor a ON al.aut_codigo = a.aut_codigo
            INNER JOIN livro l ON al.liv_codigo = l.liv_codigo
            WHERE al.liv_codigo = ?`;
        const [registros] = await conexao.execute(sql, [livCodigo]);
        global.poolConexoes.releaseConnection(conexao);
        const listaAutores = [];
        for (const registro of registros) {
            const autor = new Autor(registro.aut_codigo, registro.aut_nome);
            const livro = new Livro(
                registro.liv_codigo,
                registro.liv_titulo,
                registro.liv_isbn,
                registro.liv_dataPublicacao
            );
            const autorLivro = new AutorLivro(autor, livro);
            listaAutores.push(autorLivro);
        }
        return listaAutores;
    }
}

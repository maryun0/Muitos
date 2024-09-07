import AutorLivro from '../Modelo/autorLivro.js'; 
import AutorLivroDAO from '../Persistencia/autorLivroDAO.js'; 

export default class AutorLivroCtrl {
   
    async associarAutorLivro(requisicao, resposta) {
        const { autorCodigo, livroCodigo } = requisicao.body;
        if (autorCodigo && livroCodigo) {
            try {
                const autorLivro = new AutorLivro(autorCodigo, livroCodigo);
                await autorLivro.associar();
                resposta.json({ status: true, mensagem: "Livro associado ao autor com sucesso!" });
            } catch (erro) {
                resposta.status(500).json({ status: false, mensagem: "Erro ao associar livro ao autor: " + erro.message });
            }
        } else {
            resposta.status(400).json({ status: false, mensagem: "Código do autor e do livro são obrigatórios." });
        }
    }

    async desassociarAutorLivro(requisicao, resposta) {
        const { autorCodigo, livroCodigo } = requisicao.body;
        if (autorCodigo && livroCodigo) {
            try {
                const autorLivro = new AutorLivro(autorCodigo, livroCodigo);
                await autorLivro.desassociar();
                resposta.json({ status: true, mensagem: "Associação entre autor e livro removida com sucesso!" });
            } catch (erro) {
                resposta.status(500).json({ status: false, mensagem: "Erro ao desassociar livro do autor: " + erro.message });
            }
        } else {
            resposta.status(400).json({ status: false, mensagem: "Código do autor e do livro são obrigatórios." });
        }
    }

    
    async consultarLivrosPorAutor(requisicao, resposta) {
        const { autorCodigo } = requisicao.params;
        if (autorCodigo) {
            try {
                const autorLivroDAO = new AutorLivroDAO();
                const livros = await autorLivroDAO.consultarLivrosPorAutor(autorCodigo);
                resposta.json({ status: true, livros });
            } catch (erro) {
                resposta.status(500).json({ status: false, mensagem: "Erro ao consultar livros por autor: " + erro.message });
            }
        } else {
            resposta.status(400).json({ status: false, mensagem: "Código do autor é obrigatório." });
        }
    }

   
    async consultarAutoresPorLivro(requisicao, resposta) {
        const { livroCodigo } = requisicao.params;
        if (livroCodigo) {
            try {
                const autorLivroDAO = new AutorLivroDAO();
                const autores = await autorLivroDAO.consultarAutoresPorLivro(livroCodigo);
                resposta.json({ status: true, autores });
            } catch (erro) {
                resposta.status(500).json({ status: false, mensagem: "Erro ao consultar autores por livro: " + erro.message });
            }
        } else {
            resposta.status(400).json({ status: false, mensagem: "Código do livro é obrigatório." });
        }
    }
}

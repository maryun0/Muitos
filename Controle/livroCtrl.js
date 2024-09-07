import LivroDAO from '../Persistencia/livroDAO.js'; 
import AutorLivroDAO from '../Persistencia/autorLivroDAO.js';
import Livro from '../Modelo/livro.js';

export default class LivroCtrl {
    async gravar(requisicao, resposta) {
        const dados = requisicao.body;
        const livro = new Livro(0, dados.titulo, dados.dataPublicacao, dados.numeroPaginas);
        await livro.gravar();
        resposta.json({ status: true, mensagem: "Livro incluído com sucesso!" });
    }

    async adicionarAutorAoLivro(requisicao, resposta) {
        const { livroCodigo, autorCodigo } = requisicao.body;
        if (livroCodigo && autorCodigo) {
            const autorLivroDAO = new AutorLivroDAO();
            await autorLivroDAO.adicionarAutorLivro(autorCodigo, livroCodigo);
            resposta.json({ status: true, mensagem: "Autor associado ao livro com sucesso!" });
        } else {
            resposta.status(400).json({ status: false, mensagem: "Código do autor e do livro são obrigatórios." });
        }
    }

    async consultar(requisicao, resposta) {
        const termo = requisicao.params.termo || '';
        const livroDAO = new LivroDAO();
        const listaLivros = await livroDAO.consultar(termo);
        resposta.json({ status: true, listaLivros });
    }
}

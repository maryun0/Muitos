import AutorDAO from '../Persistencia/autorDAO.js'; 
import AutorLivroDAO from '../Persistencia/autorLivroDAO.js';
import Autor from '../Modelo/autor.js';

export default class AutorCtrl {
    async gravar(requisicao, resposta) {
        const dados = requisicao.body;
        const autor = new Autor(0, dados.nome, dados.biografia);
        await autor.gravar();
        resposta.json({ status: true, mensagem: "Autor incluído com sucesso!" });
    }

    async adicionarLivroAoAutor(requisicao, resposta) {
        const { autorCodigo, livroCodigo } = requisicao.body;
        if (autorCodigo && livroCodigo) {
            const autorLivroDAO = new AutorLivroDAO();
            await autorLivroDAO.adicionarAutorLivro(autorCodigo, livroCodigo);
            resposta.json({ status: true, mensagem: "Livro associado ao autor com sucesso!" });
        } else {
            resposta.status(400).json({ status: false, mensagem: "Código do autor e do livro são obrigatórios." });
        }
    }

    async consultar(requisicao, resposta) {
        const termo = requisicao.params.termo || '';
        const autorDAO = new AutorDAO();
        const listaAutores = await autorDAO.consultar(termo);
        resposta.json({ status: true, listaAutores });
    }
}

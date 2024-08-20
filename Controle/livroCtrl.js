import Livro from "../Modelo/livro.js";
import Autor from "../Modelo/autor.js";

export default class LivroCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const data = dados.data;
            const qtdeEstoque = dados.qtdeEstoque;
            const autor_codigo = dados.autor.codigo;

            if (nome && nome.length > 0 && data && qtdeEstoque > 0 && autor_codigo > 0) {
                const autor = new Autor(autor_codigo);
                const livro = new Livro(0, nome, data, qtdeEstoque, autor);
                
                livro.gravar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "codigoGerado": livro.codigo,
                            "mensagem": "Livro incluído com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o livro: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do livro conforme a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um livro!"
            });
        }
    }

    async atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const data = dados.data;
            const qtdeEstoque = dados.qtdeEstoque;
            const autor_codigo = dados.autor.codigo;

            if (nome  && data > 0 && qtdeEstoque > 0 && autor_codigo > 0) {
                const autor = new Autor(autor_codigo);
                const livro = new Livro(0, nome, data, qtdeEstoque, autor);
                
                livro.atualizar()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Livro atualizado com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o livro: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código, nome e autor do livro!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um livro!"
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const livro = new Livro(codigo);
                
                livro.excluir()
                    .then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Livro excluído com sucesso!"
                        });
                    })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o livro: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do livro!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um livro!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const livro = new Livro();
            livro.consultar(termo).then((listaLivro) => {
                resposta.json(
                    {
                        status: true,
                        listaLivro
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os livros: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar livros!"
            });
        }
    }
}

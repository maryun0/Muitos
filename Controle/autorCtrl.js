//camada de interface da API que traduz HTTP
import Autor from "../Modelo/autor.js";

export default class AutorCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            if (nome) {
                const autor = new Autor(0, nome);
                
                autor.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": autor.codigo,
                        "mensagem": "Autor incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o autor:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o nome correto do autor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um autor!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            if (codigo && nome) {
                const autor = new Autor(codigo, nome);
              
                autor.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Autor atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o autor:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e o nome do autor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um autor!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const autor = new Autor(codigo);
                autor.possuiLivros().then(resposta =>{
                    if (resposta == false){
                        autor.excluir().then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Autor excluída com sucesso!"
                            });
                        })
                            .catch((erro) => {
                                resposta.status(500).json({
                                    "status": false,
                                    "mensagem": "Erro ao excluir a autor:" + erro.message
                                });
                            });
                    }
                    else{
                        resposta.status(500).json({
                        "status" : false,
                        "mensagem" : "Autor possui livros associados!"
                            
                        });
                    }
                });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do autor!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um autor!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
       
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const autor = new Autor();
            autor.consultar(termo).then((listaAutor)=>{
                resposta.json(
                    {
                        status:true,
                        listaAutor
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os autores: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar os autores!"
            });
        }
    }
}
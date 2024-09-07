import { assinar, verificarAssinatura } from "./funcoesJWT.js";

export default function login(req, resp) {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario === 'admin' && senha === 'admin') {
        req.session.usuario = usuario;
        const token = assinar(usuario);

        resp.status(200).json({
            status: true,
            mensagem: "Logado com sucesso!",
            token: token
        });
    } else {
        resp.status(401).json({
            status: false,
            mensagem: "Login ou senha inválido!"
        });
    }
}

export function logout(req, resp) {
    req.session.destroy(err => {
        if (err) {
            return resp.status(500).json({
                status: false,
                mensagem: "Erro ao encerrar sessão!"
            });
        }
        resp.status(200).json({
            status: true,
            mensagem: "Logout realizado com sucesso!"
        });
    });
}

export function verificarAutenticacao(req, resp, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return resp.status(401).json({
            status: false,
            mensagem: "Token ausente!"
        });
    }

    try {
        const tokenSemBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

        const tokenVerificado = verificarAssinatura(tokenSemBearer);

        if (tokenVerificado && tokenVerificado.usuario === req.session.usuario) {
            next();
        } else {
            return resp.status(401).json({
                status: false,
                mensagem: "Token inválido ou usuário não autenticado!"
            });
        }
    } catch (error) {
        return resp.status(401).json({
            status: false,
            mensagem: `Erro na verificação do token: ${error.message}`
        });
    }
}

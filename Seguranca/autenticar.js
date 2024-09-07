export function login(req, resp) {
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    if (usuario === 'admin' && senha === 'admin') {
        req.session.usuario = usuario;
    }
    else{
        resp.status(401).json({
            status:false,
            mensagem: `Login ou senha inválido!`
        });
    }
}

export function logout(req, resp) {
    req.session.destroy();
}
import jwt from 'jsonwebtoken';

export function assinar(usuario) {
    if (!process.env.CHAVE_SECRETA) {
        throw new Error("CHAVE_SECRETA não definida. Verifique suas variáveis de ambiente.");
    }

    const token = jwt.sign({ usuario }, process.env.CHAVE_SECRETA, {
        expiresIn: '1800s'
    });

    return token;
}

export function verificarAssinatura(token) {
    
    if (!process.env.CHAVE_SECRETA) {
        throw new Error("CHAVE_SECRETA não definida. Verifique suas variáveis de ambiente.");
    }

    try {
        const decoded = jwt.verify(token, process.env.CHAVE_SECRETA);
        return decoded;
    } catch (err) {
        throw new Error(`Erro ao verificar token: ${err.message}`);
    }
}

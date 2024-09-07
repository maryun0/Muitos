import mysql from 'mysql2/promise';

export default async function conectar() {
    if (global.poolConexoes) {
        return await global.poolConexoes.getConnection();
    } else {
        const pool = mysql.createPool({
            host: 'localhost',
            user: process.env.USUARIO_BD,
            password: process.env.SENHA_BD,
            database: 'sistema',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });

        global.poolConexoes = pool;

        const conexao = await pool.getConnection();
        await inicializarBanco(conexao); 
        return conexao;
    }
}

async function inicializarBanco(conexao) {
    try {
        
        const sqlCriarTabelaAutor = `
        CREATE TABLE IF NOT EXISTS autor (
            autor_codigo INT NOT NULL AUTO_INCREMENT,
            autor_nome VARCHAR(100) NOT NULL,
            autor_biografia TEXT,
            CONSTRAINT pk_autor PRIMARY KEY (autor_codigo)
        );`;

        await conexao.execute(sqlCriarTabelaAutor);

        
        const sqlCriarTabelaLivro = `
        CREATE TABLE IF NOT EXISTS livro (
            livro_codigo INT NOT NULL AUTO_INCREMENT,
            livro_titulo VARCHAR(100) NOT NULL,
            livro_dataPublicacao DATE,
            livro_numeroPaginas INT NOT NULL,
            CONSTRAINT pk_livro PRIMARY KEY (livro_codigo)
        );`;

        await conexao.execute(sqlCriarTabelaLivro);

       
        const sqlCriarTabelaAutorLivro = `
        CREATE TABLE IF NOT EXISTS autor_livro (
            autor_codigo INT NOT NULL,
            livro_codigo INT NOT NULL,
            CONSTRAINT fk_autor FOREIGN KEY (autor_codigo) REFERENCES autor(autor_codigo),
            CONSTRAINT fk_livro FOREIGN KEY (livro_codigo) REFERENCES livro(livro_codigo),
            PRIMARY KEY (autor_codigo, livro_codigo)
        );`;

        await conexao.execute(sqlCriarTabelaAutorLivro);

        console.log("Tabelas verificadas e criadas com sucesso.");
    } catch (e) {
        console.error("Erro ao inicializar o banco de dados: " + e.message);
    }
}

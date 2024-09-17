import express from 'express';
import cors from 'cors';
import rotaAutor from './Rotas/rotaAutor.js';
import rotaLivro from './Rotas/rotaLivro.js';
import session from 'express-session';
import dotenv from 'dotenv';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import { verificarAutenticacao } from './Seguranca/autenticar.js';

dotenv.config(); 

const host = '0.0.0.0';
const porta = 4000;

const app = express();

app.use(session({
    secret: process.env.CHAVE_SECRETA,
    resave: true, 
    saveUninitialized: true, 
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: false,
        maxAge: 1000 * 60 * 15 
    }
}));

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://192.168.10.152:3000"],
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/autor', verificarAutenticacao, rotaAutor);
app.use('/livro', verificarAutenticacao, rotaLivro);
app.use('/autenticacao', rotaAutenticacao);

app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
});

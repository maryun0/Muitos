import express from 'express';
import cors from 'cors';
import rotaAutor from './Rotas/rotaAutor.js';
import rotaLivro from './Rotas/rotaLivro.js';
import session from 'express-session';
const host='localhost';
const porta=3000;

const app = express();
app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 15}

}));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/autor',rotaAutor);
app.use('/livro',rotaLivro);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
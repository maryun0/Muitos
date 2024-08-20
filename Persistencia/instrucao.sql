CREATE DATABASE sistema;

USE sistema;

CREATE TABLE autor(
    autor_codigo INT NOT NULL AUTO_INCREMENT,
    autor_nome VARCHAR(100) NOT NULL,
    PRIMARY KEY(autor_codigo)
);

CREATE TABLE livro(
    livro_codigo INT NOT NULL AUTO_INCREMENT,
    livro_nome VARCHAR(100) NOT NULL,
    livro_data DECIMAL(10,2) NOT NULL DEFAULT 0,
    livroqtdeestoque INT NOT NULL,
    autor_codigo INT NOT NULL,
    PRIMARY KEY (livro_codigo),
    CONSTRAINT pk_livro PRIMARY KEY(livro_codigo),
);
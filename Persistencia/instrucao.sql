CREATE DATABASE sistema;

USE sistema;

CREATE TABLE autor (
    autor_codigo INT NOT NULL AUTO_INCREMENT,
    autor_nome VARCHAR(100) NOT NULL,
    autor_biografia TEXT,
    CONSTRAINT pk_autor PRIMARY KEY (autor_codigo)
);

CREATE TABLE livro (
    livro_codigo INT NOT NULL AUTO_INCREMENT,
    livro_titulo VARCHAR(100) NOT NULL,
    livro_dataPublicacao DATE,
    livro_numeroPaginas INT NOT NULL,
    autor_codigo INT NOT NULL,
    CONSTRAINT pk_livro PRIMARY KEY (livro_codigo),
    CONSTRAINT fk_autor FOREIGN KEY (autor_codigo) REFERENCES autor(autor_codigo)
);

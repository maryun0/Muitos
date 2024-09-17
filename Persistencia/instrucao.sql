CREATE TABLE IF NOT EXISTS autor (
    aut_codigo INT NOT NULL AUTO_INCREMENT,
    aut_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_autor PRIMARY KEY (aut_codigo)
);

CREATE TABLE IF NOT EXISTS livro (
    liv_codigo INT NOT NULL AUTO_INCREMENT,
    liv_titulo VARCHAR(200) NOT NULL,
    liv_isbn VARCHAR(20) NOT NULL,
    liv_data_publicacao DATE NOT NULL,
    CONSTRAINT pk_livro PRIMARY KEY (liv_codigo)
);

CREATE TABLE IF NOT EXISTS autor_livro (
    aut_codigo INT NOT NULL,
    liv_codigo INT NOT NULL,
    CONSTRAINT pk_autor_livro PRIMARY KEY (aut_codigo, liv_codigo),
    CONSTRAINT fk_autor_livro_autor FOREIGN KEY (aut_codigo) REFERENCES autor (aut_codigo),
    CONSTRAINT fk_autor_livro_livro FOREIGN KEY (liv_codigo) REFERENCES livro (liv_codigo)
);

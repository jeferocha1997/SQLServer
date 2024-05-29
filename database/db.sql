
-- Tabela: Usuario
CREATE TABLE Usuario (
    id_usuario NUMERIC(7) IDENTITY(1,1) PRIMARY KEY NOT NULL,
    nome_completo_usuario VARCHAR(20) NOT NULL,
	nome_usuario VARCHAR(20) NOT NULL,
    senha_usuario VARCHAR(20) NOT NULL,
	tipo_usuario NUMERIC NOT NULL,
	data_nasc_usuario DATETIME NOT NULL,
	telefone_usuario VARCHAR(20) NOT NULL
);

-- Tabela: Categoria
CREATE TABLE Categoria (
    id_categoria NUMERIC(7) IDENTITY(1,1) PRIMARY KEY NOT NULL,
    nome_categoria VARCHAR(20) NOT NULL,
	descricao_categoria VARCHAR(45) NOT NULL,
    url_imagem_categoria VARCHAR(200) NOT NULL
);

-- Tabela: Cadastro_Noticia_Categoria
CREATE TABLE Cadastro_Noticia_Categoria (
    id_noticia NUMERIC(7) IDENTITY(1,1) PRIMARY KEY NOT NULL,
    titulo_noticia VARCHAR(45) NOT NULL,
    descricao_noticia VARCHAR(200) NOT NULL,
    url_noticia VARCHAR(200) NOT NULL,
    url_imagem_noticia VARCHAR(200) NOT NULL,
    data_inicio_noti DATETIME NOT NULL,
    data_fim_noti DATETIME NOT NULL,
    usuario_id_usuario NUMERIC(7) NOT NULL,
    categoria_id_categoria NUMERIC(7) NOT NULL,
    FOREIGN KEY (usuario_id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (categoria_id_categoria) REFERENCES Categoria(id_categoria) 
);

-- Tabela: Usuario_Preferencia_Categoria
CREATE TABLE Usuario_Preferencia_Categoria (
    id_usu_pref_categoria NUMERIC(7) IDENTITY(1,1) PRIMARY KEY NOT NULL,
    usuario_id_usuario NUMERIC(7) NOT NULL,
    categoria_id_categoria NUMERIC(7) NOT NULL,
    FOREIGN KEY (usuario_id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (categoria_id_categoria) REFERENCES Categoria(id_categoria)
);
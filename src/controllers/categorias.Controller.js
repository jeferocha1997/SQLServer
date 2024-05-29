import { buscarConexao, sql } from "../database/conexaoBanco.js";

// Função para obter todas as categorias
export const buscarCategoria = async (req, res) => {
    try {
        const pool = await buscarConexao();
        const result = await pool.request().query("SELECT * FROM Categoria");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para criar uma nova categoria
export const criarCategoria = async (req, res) => {
    const { nome_categoria, descricao_categoria, url_imagem_categoria } = req.body;

    if (
        nome_categoria == null ||
        descricao_categoria == null ||
        url_imagem_categoria == null
    ) {
        return res
            .status(400)
            .json({ msg: "erro" });
    }

    try {
        const pool = await buscarConexao();
        const result = await pool
            .request()
            .input("nome_categoria", sql.VarChar, nome_categoria)
            .input("descricao_categoria", sql.VarChar, descricao_categoria)
            .input("url_imagem_categoria", sql.VarChar, url_imagem_categoria)
            .query(
                "INSERT INTO Categoria (nome_categoria, descricao_categoria, url_imagem_categoria) VALUES (@nome_categoria, @descricao_categoria, @url_imagem_categoria); SELECT SCOPE_IDENTITY() as id"
            );

        res.json({
            nome_categoria,
            descricao_categoria,
            url_imagem_categoria,
            id: result.recordset[0].id,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para obter uma categoria por ID
export const buscarCategoriaPorId = async (req, res) => {
    try {
        const pool = await buscarConexao();

        const usuarioId = req.params.usuario_id;
        const result = await pool
            .request()
            .input("usuario_id", usuarioId)
            .query(`
                SELECT c.*
                FROM Usuario_Preferencia_Categoria upc
                JOIN Categoria c ON upc.categoria_id_categoria = c.id_categoria
                WHERE upc.usuario_id_usuario = @usuario_id;
            `);

        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para deletar uma categoria por ID
export const deletarCategoriaPorId = async (req, res) => {
    try {
        const pool = await buscarConexao();

        const result = await pool
            .request()
            .input("id", req.params.id)
            .query("DELETE FROM Categoria WHERE id_categoria = @id");

        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Função para atualizar uma categoria por ID
export const atualizarCategoriaPorId = async (req, res) => {
    const { nome_categoria, descricao_categoria, url_imagem_categoria } = req.body;

    if (
        nome_categoria == null ||
        descricao_categoria == null ||
        url_imagem_categoria == null
    ) {
        return res
            .status(400)
            .json({ msg: "erro" });
    }

    try {
        const pool = await buscarConexao();
        const result = await pool
            .request()
            .input("id", req.params.id)
            .input("nome_categoria", sql.VarChar, nome_categoria)
            .input("descricao_categoria", sql.VarChar, descricao_categoria)
            .input("url_imagem_categoria", sql.VarChar, url_imagem_categoria)
            .query(
                "UPDATE Categoria SET nome_categoria = @nome_categoria, descricao_categoria = @descricao_categoria, url_imagem_categoria = @url_imagem_categoria WHERE id_categoria = @id"
            );

        if (result.rowsAffected[0] === 0) return res.sendStatus(404);

        res.json({
            nome_categoria,
            descricao_categoria,
            url_imagem_categoria,
            id: req.params.id,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
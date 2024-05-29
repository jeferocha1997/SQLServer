import { buscarConexao, sql } from "../database/conexaoBanco.js";
import jwt from 'jsonwebtoken';
const segredo = 'Senh4';



export const buscarUsuario = async (req, res) => {
    const { nome_usuario, senha_usuario } = req.body;

    try {
        // Verificar as credenciais do usuário no banco de dados
        const pool = await buscarConexao();
        const result = await pool.request()
            .input("nome_usuario", sql.VarChar, nome_usuario)
            .input("senha_usuario", sql.VarChar, senha_usuario)
            .query("SELECT * FROM Usuario WHERE nome_usuario = @nome_usuario AND senha_usuario = @senha_usuario");

        // Se as credenciais estiverem corretas, gerar um token JWT
        if (result.recordset.length > 0) {
            const usuario = result.recordset[0];
            const token = jwt.sign({ id: usuario.id_usuario, nome_usuario: usuario.nome_usuario, tipo_usuario: usuario.tipo_usuario }, segredo, { expiresIn: '1h' });

            return res.json({ auth: true, token });
        } else {
            return res.status(401).json({ auth: false, message: "Credenciais inválidas" });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const criarUsuario = async (req, res) => {
    const {
        nome_completo_usuario,
        nome_usuario,
        senha_usuario,
        tipo_usuario,
        data_nasc_usuario,
        telefone_usuario
    } = req.body;

    if (
        nome_completo_usuario == null ||
        nome_usuario == null ||
        senha_usuario == null ||
        tipo_usuario == null ||
        data_nasc_usuario == null ||
        telefone_usuario == null
    ) {
        return res
            .status(400)
            .json({ message: "Bad Request. Please fill all fields" });
    }

    try {
        const pool = await buscarConexao();
        const result = await pool
            .request()
            .input("nome_completo_usuario", sql.VarChar, nome_completo_usuario)
            .input("nome_usuario", sql.VarChar, nome_usuario)
            .input("senha_usuario", sql.VarChar, senha_usuario)
            .input("tipo_usuario", sql.Int, tipo_usuario)
            .input("data_nasc_usuario", sql.DateTime, data_nasc_usuario)
            .input("telefone_usuario", sql.VarChar, telefone_usuario)
            .query(
                "INSERT INTO Usuario (nome_completo_usuario, nome_usuario, senha_usuario, tipo_usuario, data_nasc_usuario, telefone_usuario) VALUES (@nome_completo_usuario, @nome_usuario, @senha_usuario, @tipo_usuario, @data_nasc_usuario, @telefone_usuario); SELECT SCOPE_IDENTITY() as id"
            );

        const userId = result.recordset[0].id;

        // Recuperar todas as categorias
        const categorias = await pool.request().query("SELECT * FROM Categoria");

        // Ativar todas as categorias para o novo usuário
        for (const categoria of categorias.recordset) {
            await pool
                .request()
                .input("usuario_id", sql.Int, userId)
                .input("categoria_id", sql.Int, categoria.id_categoria)
                .query(
                    "INSERT INTO Usuario_Preferencia_Categoria (usuario_id_usuario, categoria_id_categoria) VALUES (@usuario_id, @categoria_id)"
                );
        }

        res.json({
            nome_completo_usuario,
            nome_usuario,
            senha_usuario,
            tipo_usuario,
            data_nasc_usuario,
            telefone_usuario,
            id: userId,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await buscarConexao();

        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM Usuario WHERE id_usuario = @id");

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        return res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const atualizarUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    const {
        nome_completo_usuario,
        nome_usuario,
        senha_usuario,
        tipo_usuario,
        data_nasc_usuario,
        telefone_usuario
    } = req.body;

    if (
        nome_completo_usuario == null ||
        nome_usuario == null ||
        senha_usuario == null ||
        tipo_usuario == null ||
        data_nasc_usuario == null ||
        telefone_usuario == null
    ) {
        return res
            .status(400)
            .json({ message: "erro" });
    }

    try {
        const pool = await buscarConexao();
        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .input("nome_completo_usuario", sql.VarChar, nome_completo_usuario)
            .input("nome_usuario", sql.VarChar, nome_usuario)
            .input("senha_usuario", sql.VarChar, senha_usuario)
            .input("tipo_usuario", sql.Int, tipo_usuario)
            .input("data_nasc_usuario", sql.DateTime, data_nasc_usuario)
            .input("telefone_usuario", sql.VarChar, telefone_usuario)
            .query(
                "UPDATE Usuario SET nome_completo_usuario = @nome_completo_usuario, nome_usuario = @nome_usuario, senha_usuario = @senha_usuario, tipo_usuario = @tipo_usuario, data_nasc_usuario = @data_nasc_usuario, telefone_usuario = @telefone_usuario WHERE id_usuario = @id"
            );

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json({
            nome_completo_usuario,
            nome_usuario,
            senha_usuario,
            tipo_usuario,
            data_nasc_usuario,
            telefone_usuario,
            id,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deletarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await buscarConexao();

        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .query("DELETE FROM Usuario WHERE id_usuario = @id");

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

import { UsuarioModel } from "../models/UsuarioModel.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export class UsuarioController {
    static async listarUsuarios(req, res) {
        try {
            const result = await UsuarioModel.listarUsuarios();
            if (result.rows.length === 0) {
                res.status(404).json({ msg: "Nenhum usuário cadastrado" });
                return;
            }
            res.status(200).json({ msg: "Usuários encontrados!", usuarios: result.rows });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os usuários", erro: error.message });
        }
    }
    static async criarUsuario(req, res) {
        try {
            const { nome, email, senha, role } = req.body;
            if (!nome || !email || !senha) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos!" });
                return;
            }
            const existente = await UsuarioModel.buscarPorEmail(email);
            if (existente.rows.length > 0) {
                res.status(400).json({ msg: "Email inválido, já existente!" });
                return;
            }
            const senhaHash = await bcrypt.hash(senha, parseInt(process.env.SALT));
            const id = uuidv4();
            if (role) {
                await UsuarioModel.criarUsuario(id, nome, email, senhaHash, role);
                res.status(201).json({ msg: "Usuário admin criado com sucesso" })
                return
            }
            await UsuarioModel.criarUsuario(id, nome, email, senhaHash, "USER");
            res.status(201).json({ msg: "Usuário criado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao cadastrar usuário", erro: error.message });
        }
    }
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await UsuarioModel.buscarPorId(id);
            const usuario = result.rows[0];
            if (!usuario) {
                res.status(404).json({ msg: "Usuário não encontrado!" });
                return;
            }
            res.status(200).json({ msg: "Usuário encontrado", usuario });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar usuário", erro: error.message });
        }
    }

    static async atualizarUsuario(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha } = req.body;
            if (!nome || !email || !senha) {
                res.status(400).json({ msg: "Preencha todos os campos" });
                return;
            }
            const senhaHash = await bcrypt.hash(senha, parseInt(process.env.SALT));
            const result = await UsuarioModel.atualizarUsuario(id, nome, email, senhaHash, "USER");
            if (result.rowCount === 0) {
                res.status(404).json({ msg: "Usuário não encontrado" });
                return;
            }
            res.status(200).json({ msg: "Usuário atuaizado com sucesso" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao ataulizar usuário", erro: error.message });
        }
    }
    static async deletarUsuario(req, res) {
        try {
            const { id } = req.params;
            const result = await UsuarioModel.deletarUsuario(id);
            if (result.rowCount === 0) {
                res.status(404).json({ msg: "Usuário não encontrado." });
                return;
            }
            res.status(200).json({ msg: "Usuário deletado com sucesso!" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao deletar usuário", erro: error.message });
        }
    }
    static async loginUsuario(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos" });
                return;
            }
            const result = await UsuarioModel.buscarPorEmail(email);
            const usuario = result.rows[0];
            if (!usuario) {
                res.status(401).json({ msg: "Email ou senha inválidos!" });
                return
            }
            const senhaValida = await bcrypt.compare(senha, usuario.senha);
            if (!senhaValida) {
                res.status(401).json({ msg: "Email ou senha inválidos!" });
                return
            }
            const token = jwt.sign(
                {
                    id: usuario.id,
                    nome: usuario.nome,
                    role: usuario.role
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            )
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 1000 //1h
            });
            res.status(200).json({
                msg: "Login realizado com sucesso",
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    role: usuario.role
                },
                token: token
            });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao realizar login", erro: error.message });
        }
    }

    static async me(req, res) {
        try {
            res.status(200).json({ msg: "Dados encontrados", usuario: req.usuario });
            return
        } catch (error) {
            res.status(500).json({ msg: "Erro ao buscar usuário logado", erro: error.message });
        }
    }

    static async logoutUsuario(req, res){
        try {
            res.clearCookie("token");
            res.status(200).json({msg: "Logout realizado com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao realizar o logout", erro: error.message})
        }
    }

}

import { FilmeModel } from "../models/FilmeModel.js";

export class FilmeController{

    static async listarFilmes(req, res){
        try {
            const result = await FilmeModel.listarFilmes();
            if(result.rowCount === 0){
                res.status(404).json({msg: "Nenhum filme no banco"});
                return;
            }
            res.status(200).json({msg: "Filmes encontrados!", filmes: result.rows});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao listar os filmes", erro: error.message});
        }
    }
    static async buscarPorId(req, res){
        try {
            const {id} = req.params;
            const result = await FilmeModel.buscarFilmeId(id);
            if(result.rowCount === 0){
                res.status(404).json({msg: "Nenhum filme encontrado com este id"});
                return;
            }
            res.status(200).json({msg: "Filme encontrado!", filme: result.rows[0]});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao buscar filme por ID", erro: error.message});
        }
    }
    static async criarFilme(req, res){
        try {
            const {titulo, genero, ano, imagem_url} = req.body;
            if(!titulo || !genero || !ano || !imagem_url){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos!"});
                return;
            }
            const result = await FilmeModel.criarFilme(titulo, genero, ano, imagem_url);
            if(result){
                res.status(201).json({msg: "Filme cadastrado com sucesso!"});
                return;
            }
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao cadastar filme.", erro: error.message});
        }
    }
    static async atualizarFilme(req, res){
        try {
            const {id} = req.params;
            const {titulo, genero, ano, imagem_url} = req.body;
            if(!titulo || !genero || !ano || !imagem_url){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos!"})
                return;
            }
            const result = await FilmeModel.atualizarFilme(id, titulo, genero, ano, imagem_url);
            if(result.rowCount === 0){
                res.status(404).json({msg: "Nenhum filme com este id"});
                return;
            }
            res.status(201).json({msg: "Filme atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao atualizar filme", erro: error.mesage});
        }
    }
    static async deletarFilme(req, res){
        try {
            const {id} = req.params;
            const result = await FilmeModel.deletarFilme(id);
            if(result.rowCount === 0){
                res.status(404).json({msg: "Nenhum filme com este id"});
                return;
            }
            res.status(200).json({msg: "Filme deletado com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao deletar filme", erro: error.message});
        }
    }
}
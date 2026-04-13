import db from "../config/db.js";

export class FilmeModel{
    static listarFilmes(){
        const sql = `select * from filmes order by id`;
        return db.query(sql);
    }
    static buscarFilmeId(id){
        const sql = `select * from filmes where id = $1`;
        return db.query(sql, [id]);
    }
    static criarFilme(titulo, genero, ano, imagem_url){
        const sql = `insert into filmes (titulo, genero, ano, imagem_url) values($1, $2, $3, $4)`;
        return db.query(sql, [titulo, genero, ano, imagem_url]);
    }
    static atualizarFilme(id, titulo, genero, ano, imagem_url){
        const sql = `update filmes set titulo = $1, genero = $2, ano = $3, imagem_url = $4 where id = $5`;
        return db.query(sql, [titulo, genero, ano, imagem_url, id]);
    }
    static deletarFilme(id){
        const sql = `delete from filmes where id = $1`;
        return db.query(sql, [id]);
    }

}
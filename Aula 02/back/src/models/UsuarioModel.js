import db from "../config/db.js";
export class UsuarioModel{
    static listarUsuarios(){
        const sql = `select id, nome, email, role from usuarios order by nome`;
        return db.query(sql);
    }
    static buscarPorEmail(email){
        const sql = `select * from usuarios where email = $1`;
        return db.query(sql, [email]);
    }
    static buscarPorId(id){
        const sql = `select id, nome, role from usuarios where id = $1`;
        return db.query(sql, [id]);
    }
    static criarUsuario(id, nome, email, senha, role){
        const sql = `insert into usuarios(id, nome, email, senha, role) values($1, $2, $3, $4, $5)`;
        return db.query(sql, [id, nome, email, senha, role]);
    }
    static atualizarUsuario(id, nome, email, senha, role){
        const sql = `update usuarios set nome = $1, email = $2, senha = $3, role = $4 where id = $5`;
        return db.query(sql, [nome, email, senha, role, id]);
    }
    static deletarUsuario(id){
        const sql = `delete from usuarios where id = $1`;
        return db.query(sql, [id]);
    }

}
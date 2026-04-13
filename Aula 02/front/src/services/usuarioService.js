import api from "./api";


export async function login(data){
    return api.post("/usuarios/login", data);
}
export async function logout(){
    return api.post("/usuarios/logout");
}
export async function getMe() {
    return api.get("/usuarios/me");
}
export async function listarUsuarios(){
    return await api.get("/usuarios");
}
export async function criarUsuario(dados) {
    return await api.post("/usuarios", dados);
}
export async function atualizarUsuario(id, dados) {
    return await api.put(`/usuarios/${id}`, dados);
}
export async function deletarUsuario(id) {
    return await api.delete(`/usuarios/${id}`);
}
export async function buscarUsuarioId(id) {
    return await api.get(`/usuarios/${id}`);
}

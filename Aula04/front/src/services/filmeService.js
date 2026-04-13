import api from "./api";

export async function listarFilmes(){
    return await api.get("/filmes");
}
export async function criarFilme(dados) {
    return await api.post("/filmes", dados);
}
export async function atualizarFilme(id, dados) {
    return await api.put(`/filmes/${id}`, dados);
}
export async function deletarFilme(id) {
    return await api.delete(`/filmes/${id}`);
}
export async function buscarFilmeId(id) {
    return await api.get(`/filmes/${id}`);
}
